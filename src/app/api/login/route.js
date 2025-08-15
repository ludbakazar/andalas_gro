import { comparePasswords, createToken } from "@/lib/auth";
import errorHandler from "@/lib/errorHandler";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return Response.json(
        { message: "Missing username or password" },
        { status: 400 }
      );
    }
    const user = await prisma.users.findFirst({
      where: { username },
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const comparePass = await comparePasswords(password, user.password);
    if (!comparePass) {
      return Response.json(
        { message: "Invalid username/password" },
        { status: 401 }
      );
    }

    const access_token = createToken({
      id: user.id,
    });

    const cookiesStore = await cookies();
    cookiesStore.set("authorization", `Bearer ${access_token}`);

    return Response.json(
      {
        access_token,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
