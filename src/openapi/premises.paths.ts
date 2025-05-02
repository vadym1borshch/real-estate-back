import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { PremisesSchema } from '../schemas/premises.schema'

export const createPremisesPaths = (registry: OpenAPIRegistry) => {
  registry.register('PremisesRequest', PremisesSchema)

  registry.registerPath({
    method: 'get',
    path: '/premises',
    tags: ['Premises'],
    responses: {
      201: { description: 'ok', content: { 'application/json': { schema: PremisesSchema } } },
      500: {
        description: 'Server error',
      },
    },
  })
}
