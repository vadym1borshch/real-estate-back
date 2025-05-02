import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'
import { ServiceSchema, ServicesSchema } from '../schemas/services.schema'

export const createServicesPaths = (registry: OpenAPIRegistry) => {
  registry.register('ServicesRequest', ServicesSchema)

  registry.registerPath({
    method: 'get',
    path: '/services',
    tags: ['Services'],
    responses: {
      201: { description: 'ok', content: { 'application/json': { schema: ServicesSchema } } },
      500: {
        description: 'Server error',
      },
    },
  })

  registry.registerPath({
    method: 'patch',
    path: '/services',
    tags: ['Services'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              id: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
              checked: z.boolean().optional().openapi({ example: true }),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Service updated successfully',
        content: {
          'application/json': {
            schema: ServiceSchema,
          },
        },
      },
      404: { description: 'Service not found' },
      500: { description: 'Server error' },
    },
  })

}
