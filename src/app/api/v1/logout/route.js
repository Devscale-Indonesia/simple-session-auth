import { prisma } from "@/utils/prisma";
import { headers } from "next/headers";

export async function POST() {
  const headerList = headers();
  const authorization = headerList.get("authorization");
  const sessionId = authorization.split(" ")[1];

  // Delete session Id
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });

  return Response.json({ message: "Logout success!" });
}
