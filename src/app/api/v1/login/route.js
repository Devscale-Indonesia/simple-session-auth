import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { email, password } = await req.json();

  // 1. find user in db base on user email
  // 2. matching
  // 3. authorization

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return Response.json({ message: "Invalid Credential" }, { status: 422 });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return Response.json({ message: "Invalid Credential" }, { status: 422 });
  }

  // Success!
  // authorization
  // Insert Session to DB
  const session = await prisma.session.create({
    data: {
      userId: user.id,
    },
  });

  return Response.json({ message: "Login successs!", sessionId: session.id });
}
