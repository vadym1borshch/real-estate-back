import { z } from 'zod'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'

extendZodWithOpenApi(z)

export const LoginSchema = z
  .object({
    email: z.string().email().openapi({ example: 'user@example.com' }),
    password: z.string().min(8).openapi({ example: 'supersecure' }),
  })
  .openapi({
    title: 'LoginRequest',
    description: 'Login user',
  })

export type LoginInput = z.infer<typeof LoginSchema>