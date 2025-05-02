import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { LoginSchema } from '../schemas/login.schema'
import { RegisterSchema } from '../schemas/register.schema'
import { AuthResponseSchema } from '../schemas/auth-response.schema'

export const createAuthPaths = (registry: OpenAPIRegistry) => {
  registry.register('LoginRequest', LoginSchema)
  registry.register('RegisterRequest', RegisterSchema)
  registry.register('AuthResponse', AuthResponseSchema)

  registry.registerPath({
    method: 'post',
    path: '/auth/register',
    tags: ['Auth'],
    request: { body: { content: { 'application/json': { schema: RegisterSchema } } } },
    responses: {
      201: { description: 'User registered', content: { 'application/json': { schema: AuthResponseSchema } } },
      400: {
        description: 'User already exists or validation error',
      },
    },
  })

  registry.registerPath({
    method: 'post',
    path: '/auth/login',
    tags: ['Auth'],
    request: { body: { content: { 'application/json': { schema: LoginSchema } } } },
    responses: {
      200: { description: 'User logged in', content: { 'application/json': { schema: AuthResponseSchema } } },
      401: {
        description: 'Invalid credentials',
      },
      500: {
        description: 'Server error',
      },
    },
  })
}
