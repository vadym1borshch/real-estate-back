import { z } from 'zod'


export const ServiceWorkersSchema = z
  .array(z.object({
    id: z.string().uuid(),
    name: z.string(),
    professionId: z.string().uuid(),
    description: z.string(),
    createdAt: z.date(),
    photo: z.string(),
    phone: z.string(),
    address: z.string(),
    email: z.string(),
  }))
  .openapi({
    title: 'ServiceWorkers',
  })

export type ServiceWorkers = z.infer<typeof ServiceWorkersSchema>