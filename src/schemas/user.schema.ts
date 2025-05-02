import { z } from 'zod'
import { EstateSchema } from './estate.schema'
import { MessagesSchema } from './messages.schema'

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  lastName: z.string(),
  professionId: z.string().uuid().optional().nullable(),
  description: z.string().optional().nullable(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  province: z.string().optional().nullable(),
  photo: z.string().optional().nullable(),
  verifiedId: z.string().uuid().optional().nullable(),
  agencyId: z.string().uuid().optional().nullable(),
  password: z.string(),
  createdAt: z.date(),

  messageThreads: z.array(MessagesSchema).optional(),
  estates: z.array(EstateSchema).optional(),
  agency: z.object({
    id: z.string().uuid(),
    name: z.string(),
    website: z.string(),
    phone: z.string(),
    address: z.string(),
    type: z.string(),
    email: z.string(),
  }).optional().nullable(),
  profession: z.object({}).optional().nullable(),
  verified: z.object({
    id: z.string().uuid(),
    value: z.boolean(),
    title: z.string(),
  }).optional().nullable(),
  favorites: z.array(z.string()).optional(),
})
  .openapi({
    title: 'User',
  })

export type User = z.infer<typeof UserSchema>