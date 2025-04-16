import { Request, Response } from 'express'
import { readFile } from 'fs/promises'
import { createHash } from 'crypto'
import { uploadToCloudinary } from '../utils/cloudinary'

export const uploadImages = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[]
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' })
    }

    const urls: string[] = []

    for (const file of files) {
      const buffer = await readFile(file.path)
      const hash = createHash('sha256').update(buffer).digest('hex')

      const uploadResult = await uploadToCloudinary(file.path, hash)

      urls.push(`${uploadResult.secure_url}?hash=${hash}`)
    }

    return res.status(200).json({ urls })
  } catch (err) {
    console.error('[UPLOAD IMAGES ERROR]', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
