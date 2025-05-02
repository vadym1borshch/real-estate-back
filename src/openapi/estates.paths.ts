import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'
import {
  CreateOrUpdateEstateSchema,
  EstateSchema,
  UpdateRealEstateAdditionalInfoSchema,
} from '../schemas/estate.schema'


export const createEstatesPaths = (registry: OpenAPIRegistry) => {
  registry.register('RealEstatesRequest', EstateSchema)

  registry.registerPath({
    method: 'get',
    path: '/real-estates',
    tags: ['RealEstates'],
    responses: {
      201: { description: 'ok', content: { 'application/json': { schema: EstateSchema } } },
      500: {
        description: 'Server error',
      },
    },
  })

  registry.registerPath({
    method: 'get',
    path: '/real-estates/user-ads',
    tags: ['RealEstates'],
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
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: EstateSchema,
          },
        },
      },
      404: { description: 'Estate not found' },
      500: { description: 'Server error' },
    },
  })

  registry.registerPath({
    method: 'patch',
    path: '/real-estates/toggle-favorite',
    tags: ['RealEstates'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              userId: z.string().uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
              estateId: z.number().openapi({ example: 123456 }),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: z.object({
              favoredBy: z.array(z.string()).openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
              id: z.number().openapi({ example: 123456 }),
            }),
          },
        },
      },
      404: {
        description: 'Estate not found',
      },
      500: {
        description: 'Server error',
      },
    },
  })

  registry.registerPath({
    method: 'post',
    path: '/real-estates',
    tags: ['RealEstates'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateOrUpdateEstateSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Real estate created',
        content: {
          'application/json': {
            schema: z.object({
              estate: z.array(EstateSchema),
            }),
          },
        },
      },
      500: {
        description: 'Server error',
      },
    },
  })

  registry.registerPath({
    method: 'patch',
    path: '/real-estates/update-estate',
    tags: ['RealEstates'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateOrUpdateEstateSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Real estate updated',
        content: {
          'application/json': {
            schema: z.object({
              estate: z.array(EstateSchema),
            }),
          },
        },
      },
      500: {
        description: 'Server error',
      },
    },
  })

  registry.registerPath({
    method: 'patch',
    path: '/real-estates/update-estate-info',
    tags: ['RealEstates'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateOrUpdateEstateSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Real estate updated',
        content: {
          'application/json': {
            schema: z.object({
              estate: z.array(EstateSchema),
            }),
          },
        },
      },
      500: {
        description: 'Server error',
      },
    },
  })

  registry.registerPath({
    method: 'patch',
    path: '/real-estates/update-additional-info',
    tags: ['RealEstates'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: UpdateRealEstateAdditionalInfoSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Real estate updated',
        content: {
          'application/json': {
            schema: z.object({
              estate: z.array(EstateSchema),
            }),
          },
        },
      },
      500: { description: 'Server error' },
    },
  })
}
