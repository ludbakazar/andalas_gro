import { hashPassword } from "@/lib/auth";
import errorHandler from "@/lib/errorHandler";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { name, email, username, password, role } = await request.json();

    const user = await prisma.users.create({
      data: {
        email,
        username,
        password: await hashPassword(password),
      },
    });

    await prisma.employees.create({
      data: {
        name,
        role,
        userId: user.id,
      },
    });

    return Response.json({
      message: "User registered successfully",
      status: 201,
    });
  } catch (error) {
    return errorHandler(error);
  }
}
