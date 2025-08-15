import errorHandler from "@/lib/errorHandler";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const userId = Number(request.headers.get("userId"));
    const { code, name, phone, address } = await request.json();

    await prisma.suppliers.create({
      data: {
        code: code.toUpperCase(),
        name: name.toUpperCase(),
        phone: phone.toUpperCase(),
        address: address.toUpperCase(),
        createdByUserId: userId,
        updatedByUserId: userId,
      },
    });
    return Response.json(
      {
        message: "Supplier created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
