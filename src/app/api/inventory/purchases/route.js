import errorHandler from "@/lib/errorHandler";
import { transformBigInt } from "@/lib/helpers";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const userId = Number(request.headers.get("userId"));
  try {
    const data = await request.json();
    const supplierId = data.supplierId;
    const invoiceNumber = data.invoiceNumber;
    const items = data.items;
    const total = items.reduce(
      (acc, item) => acc + item.basicPrice * item.qty,
      0
    );

    const purchasesOrder = await prisma.purchasesOrders.create({
      data: {
        invNumber: invoiceNumber,
        supplierId: supplierId,
        invoiceStatus: "unpaid",
        total: total,
        createdById: userId,
        updatedById: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    items.map(async (item) => {
      const exsistProduct = await prisma.products.findFirst({
        where: {
          code: item.code,
        },
      });

      if (!exsistProduct) {
        await prisma.products.create({
          data: {
            code: item.code,
            name: item.name.toUpperCase(),
            brand: item.brand.toUpperCase(),
            type: item.type.toUpperCase(),
            size: item.size.toUpperCase(),
            unit: item.unit,
            qty: item.qty,
            basicPrice: item.basicPrice,
            createdByUserId: userId,
            updatedByUserId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            purchaseOrderItems: {
              create: {
                purchaseOrderId: purchasesOrder.id,
                name: item.name.toUpperCase(),
                brand: item.brand.toUpperCase(),
                type: item.type.toUpperCase(),
                unit: item.unit,
                qty: item.qty,
                basicPrice: item.basicPrice,
                createdById: userId,
                updatedById: userId,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
          },
          include: {
            purchaseOrderItems: true,
          },
        });
      }
      console.log(exsistProduct);
      await prisma.products.update({
        where: {
          id: exsistProduct.id,
        },
        data: {
          qty: {
            increment: item.qty,
          },
          updatedByUserId: userId,
          updatedAt: new Date(),
          purchaseOrderItems: {
            create: {
              purchaseOrderId: purchasesOrder.id,
              name: item.name.toUpperCase(),
              brand: item.brand.toUpperCase(),
              type: item.type.toUpperCase(),
              unit: item.unit,
              qty: item.qty,
              basicPrice: item.basicPrice,
              createdById: userId,
              updatedById: userId,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
      });
    });

    await prisma.supplierDebts.update({
      where: {
        supplierId: supplierId,
      },
      data: {
        debtAmount: {
          increment: total,
        },
      },
    });

    return Response.json({ message: "Purchase order created successfully" });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET(request) {
  try {
    const data = await prisma.purchasesOrders.findMany({
      where: {
        status: true,
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const transformedData = JSON.parse(
      JSON.stringify(data, (key, value) => transformBigInt(value))
    );

    return Response.json(transformedData);
  } catch (error) {
    return errorHandler(error);
  }
}
