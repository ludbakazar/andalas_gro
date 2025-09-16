import errorHandler from "@/lib/errorHandler";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const userId = Number(request.headers.get("userId"));
    const { customerId, date, invoiceNumber, items, paymentMethod, total } =
      await request.json();

    const salesOrder = await prisma.salesOrders.create({
      data: {
        customerId: customerId,
        invNumber: invoiceNumber,
        paymentStatus: paymentMethod === "cash" ? "paid" : "unpaid",
        paymentMethod: paymentMethod,
        date: new Date(date),
        total: total,
        createdById: userId,
        updatedById: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (paymentMethod === "credit") {
      await prisma.customerDebts.update({
        where: {
          customerId: customerId,
        },
        data: {
          debtAmount: {
            increment: total,
          },
        },
      });
    }

    items.map(async (item) => {
      if (item.qty > 0 && item.sellingPrice > 0) {
        await prisma.products.update({
          where: {
            id: item.id,
          },
          data: {
            qty: {
              decrement: item.qty,
            },
            salesOrderItems: {
              create: {
                salesOrderId: salesOrder.id,
                qty: item.qty,
                basicPrice: item.basicPrice,
                sellingPrice: item.sellingPrice,
                createdById: userId,
                updatedById: userId,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
          },
        });
      }
    });
    return Response.json("s");
  } catch (error) {
    return errorHandler(error);
  }
}
