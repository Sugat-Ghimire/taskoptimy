import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { text, completed, priority, category } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
  }

  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: { text, completed, priority, category },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update todo,Error message: ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
  }

  try {
    await prisma.todo.delete({ where: { id } });
    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete todo,Error message: ${error}` },
      { status: 500 }
    );
  }
}
