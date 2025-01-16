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
}).extend({
  userId: z.string(),
});

export async function GET(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const todos = await prisma.todo?.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(todos);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    // Validates input using the Zod schema
    const validatedData = TodoInputSchema.parse(body);

    const { text, priority, completed, category, userId } = validatedData;

    // Creates a new todo in the database
    const todo = await prisma.todo.create({
      data: { text, completed, priority, category, userId },
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
