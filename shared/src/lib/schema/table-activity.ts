import { z } from "zod"

export const tableActivitySchema = z.object({
  id: z.number(),
  column: z.string(),
  value: z.string(),
  isActive: z.boolean().default(false),
})

export type TableActivity = z.infer<typeof tableActivitySchema>
