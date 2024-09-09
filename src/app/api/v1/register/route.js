import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, email, password } = await req.json();

  // validation -> email ? password ?
  // collision check -> email ?

  // create hashed password
  //   console.time("Hash");
  const hashedPassword = await bcrypt.hash(password, 12); // round
  //   console.timeEnd("Hash");
  // Owasp -> 10 - 13
  // No heavy load
  // No much time

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return Response.json({ data: newUser }, { status: 201 });
}
