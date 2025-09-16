import errorHandler from "@/lib/errorHandler";

import prisma from "@/lib/prisma";
import { G } from "@react-pdf/renderer";

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

    // Gunakan transaction untuk atomic operations
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create purchase order
      const purchasesOrder = await tx.purchasesOrders.create({
        data: {
          invNumber: invoiceNumber,
          supplierId: supplierId,
          invoiceStatus: "unpaid",
          total: total,
          createdById: userId,
          updatedById: userId,
        },
      });

      // 2. Process semua items
      for (const item of items) {
        const existingProduct = await tx.products.findFirst({
          where: { code: item.code },
        });

        if (!existingProduct) {
          // Create new product
          await tx.products.create({
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
                },
              },
            },
          });
        } else {
          // Update existing product
          await tx.products.update({
            where: { id: existingProduct.id },
            data: {
              qty: { increment: item.qty },
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
        }
      }

      // 3. Update atau create supplier debt
      await tx.supplierDebts.upsert({
        where: { supplierId: supplierId },
        update: { debtAmount: { increment: total } },
        create: {
          supplierId: supplierId,
          debtAmount: total,
          debtPaid: 0,
          claimAmount: 0,
        },
      });

      return purchasesOrder;
    });

    return Response.json({
      message: "Purchase order created successfully",
    });
  } catch (error) {
    console.log(error.message);
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

    return Response.json(data);
  } catch (error) {
    return errorHandler(error);
  }
}
