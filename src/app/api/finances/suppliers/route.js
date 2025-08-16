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

export async function GET(request) {
  try {
    const suppliers = await prisma.suppliers.findMany({
      where: { status: true },
      orderBy: { name: "asc" },
    });
    return Response.json(suppliers);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(request) {
  try {
    const userId = Number(request.headers.get("userId"));
    const { supplierId } = await request.json();
    await prisma.suppliers.update({
      where: { id: supplierId },
      data: {
        status: false,
        updatedByUserId: userId,
        updatedAt: new Date(),
      },
    });
    return Response.json("Supplier deleted successfully");
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request) {
  try {
    const userId = Number(request.headers.get("userId"));
    const { supplierId, code, name, phone, address } = await request.json();

    await prisma.suppliers.update({
      where: { id: supplierId },
      data: {
        code: code.toUpperCase(),
        name: name.toUpperCase(),
        phone: phone.toUpperCase(),
        address: address.toUpperCase(),
        updatedByUserId: userId,
        updatedAt: new Date(),
      },
    });

    return Response.json(
      { message: "Supplier updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
