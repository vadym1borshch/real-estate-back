import { z } from 'zod'


export const ServiceSchema = z.object({
  title: z.string(),
  id: z.string(),
  checked: z.boolean(),
})

export const ServicesSchema = z
  .array(ServiceSchema)
  .openapi({
    title: 'Services',
  })

export type Services = z.infer<typeof ServicesSchema>