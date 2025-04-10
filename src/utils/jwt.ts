import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken'

export const signToken = (payload: object, expiresIn: SignOptions['expiresIn'] = '1h'): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn })
}

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
}
