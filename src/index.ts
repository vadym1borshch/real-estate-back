import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import authRoutes from './routes/auth.routes'
import serviceRoutes from './routes/service.routes'
import serviceWorkerRoutes from './routes/serviceWorkers.routes'
import profession from './routes/profession.routes'
import user from './routes/user.routes'
import messages from './routes/messages.routes'
import realEstates from './routes/realEstates.routes'
import { verifySocketToken } from './middlewares/authSocket'
import { setupSocket } from './socket'

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
dotenv.config({ path: envFile })

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://192.168.0.107:5173',
      'https://real-estate-wine-seven.vercel.app',
    ],
    credentials: true,
  },
})

io.use(verifySocketToken)
setupSocket(io)

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
app.use('/user', user)
app.use('/messages', messages)
app.use('/real-estates', realEstates)


const PORT = Number(process.env.PORT) || 4000
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://192.168.0.107:${PORT}`)
})
