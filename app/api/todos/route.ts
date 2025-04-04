import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";
import { TodoItemSchema } from "@/lib/validators";
const TodoInputSchema = TodoItemSchema.pick({
  text: true,
  priority: true,
  completed: true,
  category: true,
});

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const todos = await prisma.todo?.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch todos, Error message : ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = TodoInputSchema.parse(body);
    const { text, priority, completed, category } = validatedData;

    // Creates a new todo in the database with guaranteed userId
    const todo = await prisma.todo.create({
      data: {
        text,
        completed,
        priority,
        category,
        userId: session.user.id,
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
