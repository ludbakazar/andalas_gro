import errorHandler from "@/lib/errorHandler";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const userId = Number(request.headers.get("userId"));
    const { name, phone, address } = await request.json();
    await prisma.customers.create({
      data: {
        name: name.toUpperCase(),
        phone: phone.toUpperCase(),
        address: address.toUpperCase(),
        createdByUserId: userId,
        updatedByUserId: userId,
      },
    });
    return Response.json(
      { message: "Customer created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET(request) {
  try {
    const customers = await prisma.customers.findMany({
      where: {
        status: true,
      },
      orderBy: { name: "asc" },
    });

    return Response.json(customers, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(request) {
  try {
    const userId = Number(request.headers.get("userId"));
    const { supplierId } = await request.json();
    await prisma.customers.update({
      where: { id: supplierId },
      data: {
        status: false,
        updatedByUserId: userId,
        updatedAt: new Date(),
      },
    });
    return Response.json(
      { message: "Customer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request) {
  try {
    const userId = Number(request.headers.get("userId"));
    const { customerId, name, phone, address } = await request.json();

    await prisma.customers.update({
      where: { id: customerId },
      data: {
        name: name.toUpperCase(),
        phone: phone.toUpperCase(),
        address: address.toUpperCase(),
        updatedByUserId: userId,
        updatedAt: new Date(),
      },
    });

    return Response.json(
      { message: "Customer updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
