import { z } from "zod"

export const todoSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  markAsDone: z.boolean().default(false),
})

export type Todo = z.infer<typeof todoSchema>
