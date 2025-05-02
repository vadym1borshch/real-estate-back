import { z } from 'zod'


export const ProfessionsSchema = z
  .array(z.object({
    title: z.string(),
    id: z.string().uuid(),
    key: z.string(),
  }))
  .openapi({
    title: 'Professions',
  })

export type Professions = z.infer<typeof ProfessionsSchema>