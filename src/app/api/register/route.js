import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { name, email, username, password, role } = await request.json();

    const user = await prisma.users.create({
      data: {
        email,
        username,
        password,
      },
    });

    await prisma.employees.create({
      data: {
        name,
        role,
        userId: user.id,
      },
    });

    return Response.json("ok");
  } catch (error) {
    console.log(error);
    return Response.json("error");
  }
}
