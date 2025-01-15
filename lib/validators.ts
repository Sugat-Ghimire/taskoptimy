import * as z from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().optional(),
  color: z.string().optional(),
  category: z.string().optional(),
});
