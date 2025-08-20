import errorHandler from "@/lib/errorHandler";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data);
    return Response.json("ok");
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}
