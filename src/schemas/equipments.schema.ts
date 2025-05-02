import { z } from 'zod'


export const EquipmentsSchema = z
  .object({
    id: z.string().uuid(),
    title: z.string(),
    data: z.array(z.object({
      id: z.string().uuid(),
      label: z.string(),
      key: z.string(),
      category: z.string(),
      categoryTitle: z.string(),
    })),
    key: z.string(),
  })
  .openapi({
    title: 'Equipments',
  })

export type Equipments = z.infer<typeof EquipmentsSchema>