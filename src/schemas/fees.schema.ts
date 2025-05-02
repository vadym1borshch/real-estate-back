import { z } from 'zod'


export const FeesSchema = z
  .array(z.object({
    title: z.string(),
    value: z.string(),
    id: z.string().uuid(),
    key:z.string(),
    descriptions: z.string(),
    createdAt: z.date(),
    updatedAt:  z.date(),
  }))
  .openapi({
    title: 'Fees',
  })

export type Fees = z.infer<typeof FeesSchema>