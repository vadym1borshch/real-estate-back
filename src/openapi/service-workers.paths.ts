import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { ServiceWorkersSchema } from '../schemas/service-workers.schema'

export const createServiceWorkersPaths = (registry: OpenAPIRegistry) => {
  registry.register('ServiceWorkersRequest', ServiceWorkersSchema)

  registry.registerPath({
    method: 'get',
    path: '/service-workers',
    tags: ['ServiceWorkers'],
    responses: {
      201: { description: 'ok', content: { 'application/json': { schema: ServiceWorkersSchema } } },
      500: {
        description: 'Server error',
      },
    },
  })
}
