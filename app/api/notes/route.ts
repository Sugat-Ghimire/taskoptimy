import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { noteSchema } from "@/lib/validators";
import { auth } from "@/auth";

export async function GET() {
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
        title: validated.title,
        content: validated.content ?? "", // Provides default empty string
        color: validated.color ?? "#ffffff",
        category: validated.category ?? null,
        userId: session.user.id,
      },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 400 }
    );
  }
}
