import errorHandler from "@/lib/errorHandler";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");
    const product = await prisma.products.findUnique({
      where: {
        id: parseInt(productId),
      },
      include: {
        purchaseOrderItems: {
          include: {
            purchaseOrder: {
              include: {
                supplier: true,
              },
            },
          },
        },
      },
    });

    console.log(product.purchaseOrderItems[0]);

    return Response.json({ message: "Product details fetched successfully" });
  } catch (error) {
    return errorHandler(error);
  }
}
