import { prisma } from "@/utils/prisma";
import { headers } from "next/headers";

export async function GET() {
  const headerList = headers();
  const authorization = headerList.get("authorization");
  const sessionId = authorization.split(" ")[1];

  // Check session Id
  const isSessionValid = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!isSessionValid) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ message: "It's protected data" });
}
