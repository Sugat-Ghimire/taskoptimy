import * as z from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().optional(),
  color: z.string().optional(),
  category: z.string().optional(),
});
export const TodoItemSchema = z.object({
  text: z.string(),
  completed: z.boolean(),
  priority: z.enum(["low", "medium", "high"]),
  category: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
