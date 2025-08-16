import errorHandler from "@/lib/errorHandler";
import { transformBigInt } from "@/lib/helpers";
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

    const transformedData = JSON.parse(
      JSON.stringify(supplierDebt, (key, value) => transformBigInt(value))
    );
    return Response.json(transformedData);
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}
