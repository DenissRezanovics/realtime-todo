import { z } from "zod"

export const cursorActivitySchema = z.object({
  id: z.number(),
  column: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number()
  })
})

export type CursorActivity = z.infer<typeof cursorActivitySchema>
