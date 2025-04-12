import { Socket } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'
import jwt from 'jsonwebtoken'

export const verifySocketToken = (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  const token = socket.handshake.auth?.token

  if (!token) {
    return next(new Error('No token provided'))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    socket.data.user = decoded
    next()
  } catch (err) {
    next(new Error('Invalid token'))
  }
}
