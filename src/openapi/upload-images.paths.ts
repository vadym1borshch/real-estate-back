import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { PremisesSchema } from '../schemas/premises.schema'
import { ProfessionsSchema } from '../schemas/professions.schema'
import { z } from 'zod'
import { UploadImagesSchema } from '../schemas/upload-images.schema'

export const createUploadImagesPath = (registry: OpenAPIRegistry) => {
  registry.register('ProfessionsRequest', ProfessionsSchema)

  registry.registerPath({
    method: 'post',
    path: '/upload-images',
    tags: ['UploadImages'],
    request: {
      body: {
        content: {
          'multipart/form-data': {
            schema: z.object({
              files: z
                .any()
                .openapi({
                  type: 'array',
                  items: {
                    type: 'string',
                    format: 'binary',
                  },
                }),
            }),
          },
        },
      },
    },
    responses: {
      201: { description: 'ok', content: { 'application/json': { schema: UploadImagesSchema } } },
      500: {
        description: 'Server error',
      },
    },
  })
}
