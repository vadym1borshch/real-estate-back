import http from 'http'
import { Server } from 'socket.io'
import app from './app'
import { verifySocketToken } from './middlewares/authSocket'
import { setupSocket } from './socket'

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

const PORT = Number(process.env.PORT) || 4000
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://192.168.0.107:${PORT}`)
})
