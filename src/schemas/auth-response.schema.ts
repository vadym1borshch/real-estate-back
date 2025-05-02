import { z } from 'zod'

export const AuthResponseSchema = z
  .object({
    token: z.string().openapi({ example: 'JWT_TOKEN_HERE' }),
    user: z.object({
      id: z.string().uuid().openapi({ example: '1c80d9a6-4f11-4fc3-b1cd-37a99f447999' }),
      email: z.string().email().openapi({ example: 'user@example.com' }),
      name: z.string().openapi({ example: 'User' }),
      lastName: z.string().openapi({ example: 'Example' }),
      phone: z.string().openapi({ example: '+38099000000' }),
      address: z.string().openapi({ example: 'Address' }),
      province: z.string().openapi({ example: 'Province' }),
      photo: z.string().openapi({ example: 'Example' }),
  }),
  })
  .openapi({
    title: 'AuthResponse',
    description: 'JWT token + user data',
  })

export type AuthResponse = z.infer<typeof AuthResponseSchema>
