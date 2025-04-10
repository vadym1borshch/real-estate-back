import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import serviceRoutes from './routes/service.routes'
import serviceWorkerRoutes from './routes/serviceWorkers.routes'
import profession from './routes/profession.routes'

dotenv.config()

const app = express()
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://192.168.0.107:5173',
    'https://real-estate-wine-seven.vercel.app',
  ],
  credentials: true,
}))
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/', serviceRoutes)
app.use('/', serviceWorkerRoutes)
app.use('/', profession)

const PORT = Number(process.env.PORT) || 4000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://192.168.0.107:${PORT}`)
})
