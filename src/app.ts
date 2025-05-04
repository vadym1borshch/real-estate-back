import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { openApiDocument } from './openapi/@generate'
import authRoutes from './routes/auth.routes'
import serviceRoutes from './routes/service.routes'
import serviceWorkerRoutes from './routes/serviceWorkers.routes'
import profession from './routes/profession.routes'
import user from './routes/user.routes'
import messages from './routes/messages.routes'
import realEstates from './routes/realEstates.routes'
import uploadImages from './routes/uploadImages.routes'
import equipments from './routes/equipments.routes'
import feesFields from './routes/feesFields.routes'
import premisesFields from './routes/premisesFields.routes'

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
dotenv.config({ path: envFile })

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://192.168.0.107:5173',
    'https://real-estate-wine-seven.vercel.app',
  ],
  credentials: true,
}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument))
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/services', serviceRoutes)
app.use('/service-workers', serviceWorkerRoutes)
app.use('/professions', profession)
app.use('/user', user)
app.use('/messages', messages)
app.use('/real-estates', realEstates)
app.use('/upload-images', uploadImages)
app.use('/equipments', equipments)
app.use('/fees-fields', feesFields)
app.use('/premises-fields', premisesFields)

export default app
