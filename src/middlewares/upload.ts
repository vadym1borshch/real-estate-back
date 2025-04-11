import multer from 'multer'

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  },
})

export const upload = multer({ storage })