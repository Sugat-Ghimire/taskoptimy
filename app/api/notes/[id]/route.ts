import { NextResponse, NextRequest } from "next/server";

import { noteSchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const note = await prisma.note.findUnique({
    where: { id },
  });

  if (!note)
    return NextResponse.json({ error: "Note not found" }, { status: 404 });

  return NextResponse.json(note);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  try {
    const validated = noteSchema.partial().parse(body);
    const updatedNote = await prisma.note.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json(updatedNote);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.note.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error deleting note" },
      { status: 500 }
    );
  }
}
