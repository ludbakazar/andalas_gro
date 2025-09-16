import errorHandler from "@/lib/errorHandler";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const userId = Number(request.headers.get("userId"));
    const { customerId, date, invoiceNumber, items, paymentMethod, total } =
      await request.json();

    // Gunakan transaction
    await prisma.$transaction(async (tx) => {
      // 1. Create sales order
      const salesOrder = await tx.salesOrders.create({
        data: {
          customerId: customerId,
          invNumber: invoiceNumber,
          paymentStatus: paymentMethod === "cash" ? "paid" : "unpaid",
          paymentMethod: paymentMethod,
          date: new Date(date),
          total: total,
          createdById: userId,
          updatedById: userId,
        },
      });

      // 2. Process items sequentially
      for (const item of items) {
        if (item.qty > 0 && item.sellingPrice > 0) {
          // Check stok tersedia
          const product = await tx.products.findUnique({
            where: { id: item.id },
            select: { qty: true },
          });

          if (!product) {
            throw new Error(`Product dengan ID ${item.id} tidak ditemukan`);
          }

          if (product.qty < item.qty) {
            throw new Error(
              `Stok tidak cukup untuk product ${item.id}. Stok tersedia: ${product.qty}`
            );
          }

          // Update product quantity dan create sales order item
          await tx.products.update({
            where: { id: item.id },
            data: {
              qty: { decrement: item.qty },
              salesOrderItems: {
                create: {
                  salesOrderId: salesOrder.id,
                  qty: item.qty,
                  basicPrice: item.basicPrice,
                  sellingPrice: item.sellingPrice,
                  createdById: userId,
                  updatedById: userId,
                },
              },
            },
          });
        }
      }

      // 3. Handle payment method
      if (paymentMethod === "credit") {
        await tx.customerDebts.upsert({
          where: { customerId: customerId },
          update: { debtAmount: { increment: total } },
          create: {
            customerId: customerId,
            debtAmount: total,
            claimAmount: 0,
            debtPaid: 0,
          },
        });
      }

      return salesOrder;
    });

    return Response.json({
      message: "Sales order created successfully",
    });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET(request) {
  try {
    const sales = await prisma.salesOrders.findMany({
      where: {
        status: true,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return Response.json(sales);
  } catch (error) {
    return errorHandler(error);
  }
}
