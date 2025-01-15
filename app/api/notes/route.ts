import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { noteSchema } from "@/lib/validators";
import { auth } from "@/auth";

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const notes = await prisma.note.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  try {
    const validated = noteSchema.parse(body);

    const newNote = await prisma.note.create({
      data: {
        ...validated,
        userId: session.user.id,
      },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
