import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { PremisesSchema } from '../schemas/premises.schema'
import { ProfessionsSchema } from '../schemas/professions.schema'

export const createProfessionsPaths = (registry: OpenAPIRegistry) => {
  registry.register('ProfessionsRequest', ProfessionsSchema)

  registry.registerPath({
    method: 'get',
    path: '/professions',
    tags: ['Professions'],
    responses: {
      201: { description: 'ok', content: { 'application/json': { schema: ProfessionsSchema } } },
      500: {
        description: 'Server error',
      },
    },
  })
}
