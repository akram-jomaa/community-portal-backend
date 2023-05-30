import jwt from 'jsonwebtoken'

export function verifyToken(token: string, secret: string) {
    return jwt.verify(token, secret, { complete: false }) as jwt.JwtPayload
}

export function createToken(payload: Record<string, string | undefined>, secret: string, expiresIn: string) {
    return jwt.sign(payload, secret, { expiresIn })
}