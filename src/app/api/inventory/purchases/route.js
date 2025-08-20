import errorHandler from "@/lib/errorHandler";
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
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const exsistProduct = await prisma.products.findFirst({
          where: {
            code: item.code,
          },
        });
        if (!exsistProduct) {
          const product = await prisma.products.create({
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
            },
          });
        }
        return {
          productId: exsistProduct ? exsistProduct.id : product.id,
          productCode: item.code,
          productName: item.name.toUpperCase(),
          productBrand: item.brand.toUpperCase(),
          productType: item.type.toUpperCase(),
          productUnit: item.unit,
          qty: item.qty,
          basicPrice: item.basicPrice,
        };
      })
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
        purchaseOrderItems: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            name: item.productName,
            brand: item.productBrand,
            type: item.productType,
            unit: item.productUnit,
            qty: item.qty,
            basicPrice: item.basicPrice,
            createdById: userId,
            updatedById: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        },
      },
    });

    const supplierDebt = await prisma.supplierDebts.update({
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
