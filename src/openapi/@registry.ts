import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { RegisterSchema } from '../schemas/register.schema'
import { createAuthPaths } from './auth.paths'
import { createEquipmentsPaths } from './equipments.paths'
import { createFeesPaths } from './fees.paths'
import { createPremisesPaths } from './premises.paths'
import { createMessagesPaths } from './messages.paths'
import { createProfessionsPaths } from './professions.paths'
import { createServiceWorkersPaths } from './service-workers.paths'
import { createServicesPaths } from './service.paths'
import { createUploadImagesPath } from './upload-images.paths'
import { createUserPaths } from './user.paths'
import { createEstatesPaths } from './estates.paths'

const registry = new OpenAPIRegistry()

registry.register('RegisterRequest', RegisterSchema)

createAuthPaths(registry)
createEquipmentsPaths(registry)
createFeesPaths(registry)
createPremisesPaths(registry)
createMessagesPaths(registry)
createProfessionsPaths(registry)
createServiceWorkersPaths(registry)
createServicesPaths(registry)
createUploadImagesPath(registry)
createUserPaths(registry)
createEstatesPaths(registry)

export { registry }
