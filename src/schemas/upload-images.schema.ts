import { z } from 'zod'


export const UploadImagesSchema = z
  .array(z.string())
  .openapi({
    title: 'UploadImages',
  })

export type UploadImages = z.infer<typeof UploadImagesSchema>