import errorHandler from "@/lib/errorHandler";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const products = await prisma.products.findMany({
      where: {
        status: true,
      },
      select: {
        id: true,
        code: true,
        name: true,
        brand: true,
        type: true,
        size: true,
        unit: true,
        basicPrice: true,
        qty: true,
      },
      orderBy: {
        code: "asc",
      },
    });
    return Response.json(products);
  } catch (error) {
    return errorHandler(error);
  }
}
