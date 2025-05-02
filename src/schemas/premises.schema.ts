import { z } from 'zod'


export const PremisesSchema = z
  .array(z.object({
    label: z.string(),
    value: z.string(),
    id: z.string().uuid(),
    key:z.string(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt:  z.date(),
  }))
  .openapi({
    title: 'Premises',
  })

export type Premises = z.infer<typeof PremisesSchema>