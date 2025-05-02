import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'
import { registry } from './@registry'

const generator = new OpenApiGeneratorV3(registry.definitions)

export const openApiDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Real Estate API',
    version: '1.0.0',
  },
})
