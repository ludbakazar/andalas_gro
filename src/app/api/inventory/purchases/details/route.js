import errorHandler from "@/lib/errorHandler";

import prisma from "@/lib/prisma";

export async function GET(request) {
  const url = new URL(request.url);
  const purchaseOrderId = url.searchParams.get("purchaseOrderId");
  try {
    const purchaseOrder = await prisma.purchasesOrders.findUnique({
      where: {
        id: Number(purchaseOrderId),
      },
      select: {
        invNumber: true,
        invoiceStatus: true,
        total: true,
        createdAt: true,
        supplier: {
          select: {
            name: true,
          },
        },
        purchaseOrderItems: {
          select: {
            product: {
              select: {
                code: true,
                name: true,
                brand: true,
                type: true,
                size: true,
                unit: true,
                qty: true,
                basicPrice: true,
              },
            },
          },
        },
      },
    });

    return Response.json(purchaseOrder);
  } catch (error) {
    return errorHandler(error);
  }
}
