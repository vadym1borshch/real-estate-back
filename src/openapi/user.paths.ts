import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'
import { UserSchema } from '../schemas/user.schema'

export const createUserPaths = (registry: OpenAPIRegistry) => {
  registry.register('UserRequest', UserSchema)

  registry.registerPath({
    method: 'get',
    path: '/user/me',
    tags: ['User'],
    parameters: [
      {
        name: 'id',
        in: 'query',
        required: true,
        description: 'User ID',
        schema: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
      },
    ],
    responses: {
      201: { description: 'ok', content: { 'application/json': { schema: UserSchema } } },
      500: {
        description: 'Server error',
      },
    },
  })

  registry.registerPath({
    method: 'patch',
    path: '/user/update',
    tags: ['User'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              id: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
              email: z.string().email().optional().openapi({ example: 'example@gmail.com' }),
              password: z.string().optional().openapi({ example: 'password1111' }),
              name: z.string().optional().openapi({ example: 'User' }),
              lastName: z.string().optional().openapi({ example: 'Example' }),
              phone: z.string().optional().openapi({ example: '+38099000000' }),
              address: z.string().optional().openapi({ example: 'Address' }),
              province: z.string().optional().openapi({ example: 'Province' }),
              photo: z.string().optional().openapi({ example: 'Example' }),
              agency: z.string().optional().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'User updated successfully',
        content: {
          'application/json': {
            schema: UserSchema,
          },
        },
      },
      404: { description: 'User not found' },
      500: { description: 'User error' },
    },
  })

  registry.registerPath({
    method: 'patch',
    path: '/user/upload-avatar',
    tags: ['User'],
    request: {
      body: {
        content: {
          'multipart/form-data': {
            schema: z.object({
              id: z.string().openapi({ type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' }),
              file: z.any().openapi({
                type: 'string',
                format: 'binary',
              }),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Avatar uploaded and user updated successfully',
        content: {
          'application/json': {
            schema: z.object({
              user: UserSchema,
            }),
          },
        },
      },
      400: { description: 'No file uploaded' },
      404: { description: 'User not found' },
      500: { description: 'Server error' },
    },
  })

}
