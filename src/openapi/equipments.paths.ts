import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { EquipmentsSchema } from '../schemas/equipments.schema'


export const createEquipmentsPaths = (registry: OpenAPIRegistry) => {
  registry.register('EquipmentsRequest', EquipmentsSchema)

  registry.registerPath({
    method: 'get',
    path: '/equipments',
    tags: ['Equipments'],
    responses: {
      201: { description: 'ok', content: { 'application/json': { schema: EquipmentsSchema } } },
      500: {
        description: 'Server error',
      },
    },
  })
}
