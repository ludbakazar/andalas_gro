import errorHandler from "@/lib/errorHandler";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const customerDebts = await prisma.customers.findMany({
      where: {
        status: true,
      },
      include: {
        customerDebts: {
          select: {
            debtAmount: true,
            claimAmount: true,
            debtPaid: true,
          },
        },
      },
    });

    return Response.json(customerDebts, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
