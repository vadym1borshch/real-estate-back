import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { FeesSchema } from '../schemas/fees.schema'


export const createFeesPaths = (registry: OpenAPIRegistry) => {
  registry.register('FeesRequest', FeesSchema)

  registry.registerPath({
    method: 'get',
    path: '/fees',
    tags: ['Fees'],
    responses: {
      201: { description: 'ok', content: { 'application/json': { schema: FeesSchema } } },
      500: {
        description: 'Server error',
      },
    },
  })
}
