import { v2 as cloudinary } from 'cloudinary'
import { UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export const uploadToCloudinary = (filePath: string, publicId: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        public_id: `avatar_${publicId}`,
        use_filename: true,
        unique_filename: false,
        overwrite: false,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result as UploadApiResponse)
      }
    )
  })
}