import { z } from "zod"

export const todoSchema = z.object({
  id: z.number().optional(),
  markAsDone: z.boolean().default(false),
  title: z.string(),
  description: z.string(),
})

export type Todo = z.infer<typeof todoSchema>
