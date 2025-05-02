import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { MessagesSchema } from '../schemas/messages.schema'
import { z } from 'zod'

export const createMessagesPaths = (registry: OpenAPIRegistry) => {
  registry.register('MessagesRequest', MessagesSchema)

  registry.registerPath({
    method: 'get',
    path: '/messages',
    tags: ['Messages'],
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
      201: { description: 'ok', content: { 'application/json': { schema: MessagesSchema } } },
      500: {
        description: 'Server error',
      },
    },
  })

  registry.registerPath({
    method: 'patch',
    path: '/messages',
    tags: ['Messages'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              id: z.string().uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
              isArchived: z.boolean().optional().openapi({ example: true }),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Message updated successfully',
        content: {
          'application/json': {
            schema: MessagesSchema,
          },
        },
      },
      404: { description: 'Message not found' },
      500: { description: 'Server error' },
    },
  })

  registry.registerPath({
    method: 'delete',
    path: '/messages',
    tags: ['Messages'],
    parameters: [
      {
        name: 'id',
        in: 'query',
        required: true,
        description: 'MESSAGE ID',
        schema: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
      },
    ],
    responses: {
      200: {
        description: 'Message deleted successfully',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string().openapi({ example: 'Message deleted successfully' }),
            }),
          },
        },
      },
      404: {
        description: 'Message not found',
      },
      500: {
        description: 'Server error',
      },
    },
  })
}
