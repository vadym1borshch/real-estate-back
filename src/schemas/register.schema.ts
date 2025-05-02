import { z } from 'zod'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'

extendZodWithOpenApi(z)

export const RegisterSchema = z
  .object({
    email: z.string().email().openapi({ example: 'user@example.com' }),
    password: z.string().min(8).openapi({ example: 'supersecure' }),
    name: z.string().openapi({ example: 'User' }),
    lastName: z.string().openapi({ example: 'Example' }),
  })
  .openapi({
    title: 'RegisterRequest',
    description: 'Register new user',
  })

export type RegisterInput = z.infer<typeof RegisterSchema>