import {FastifyReply, FastifyRequest} from "fastify";
import {AuthService} from "../services/auth";

type exchangeTokenRequest = FastifyRequest<{
    Body: { cognitoAccessToken: string }
}>

async function exchangeTokenHandler (req: exchangeTokenRequest, res: FastifyReply) {
    const {exchangeToken} = AuthService
    const {  cognitoAccessToken } = req.body

    const {refreshToken, accessToken, user} = await exchangeToken(cognitoAccessToken)

    const maxAgeInSeconds = 2 * 24 * 60 * 60;

    res.status(200).setCookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/jwt/v1/refresh',
        signed: true,
        maxAge: maxAgeInSeconds
    }).send({accessToken, user})
}

function getRefreshTokenFromRequest (req: FastifyRequest) {
    const cookies = req.server.parseCookie(req.headers['cookie'] ?? '')
    const signedToken = cookies.refreshToken
    if(!signedToken) throw new Error('No refresh token found')
    const {valid, value} = req.unsignCookie(signedToken)
    if(!valid || !value) throw new Error('Invalid refresh token')
    return value
}

async function refreshTokenHandler (req: FastifyRequest, res: FastifyReply) {
    const {refreshAccessToken} = AuthService
    const refreshToken = getRefreshTokenFromRequest(req)
    const result = await refreshAccessToken(refreshToken)

    res.status(200).send(result)
}

async function logoutHandler (req: FastifyRequest, res: FastifyReply) {
    const {invalidateRefreshToken} = AuthService
    const refreshToken = getRefreshTokenFromRequest(req)
    await invalidateRefreshToken(refreshToken)

    res.status(200).setCookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/jwt/v1/refresh',
        signed: true,
        expires: new Date(0)
    }).send()
}

export const AuthHandler = {
    exchangeTokenHandler,
    refreshTokenHandler,
    logoutHandler
}