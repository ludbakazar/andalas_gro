import { Prisma } from "@/generated/prisma";

export default function errorHandler(error) {
  let message = error.message || "Internal Server Error";
  let status = error.status || 500;

  // if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //   message = "Value must be unique";
  //   status = 400;
  // } else if (error instanceof Prisma.PrismaClientValidationError) {
  //   message = "Validation Error: " + error.message;
  //   status = 422;
  // }

  return Response.json(
    {
      message: message,
    },
    {
      status: status,
    }
  );
}
