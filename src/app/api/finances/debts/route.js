import errorHandler from "@/lib/errorHandler";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const supplierDebt = await prisma.suppliers.findMany({
      where: {
        status: true,
      },
      select: {
        name: true,
        supplierDebts: {
          select: {
            debtAmount: true,
            claimAmount: true,
            debtPaid: true,
          },
        },
      },
    });

    return Response.json(supplierDebt);
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}
