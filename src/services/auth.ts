import {verifyCognitoToken, getUserInfo, getUserInfoFromUsername} from '../utils/authentication/cognito'
import {verifyToken, createToken} from '../utils/authentication/jwt'
import {v4} from 'uuid'
import {User} from "../types/user";
import {RefreshTokenService} from './token'

function getSecretKeys() {
    return {
        access: process.env.ACCESS_TOKEN_SECRET_KEY as string,
        refresh: process.env.REFRESH_TOKEN_SECRET_KEY as string,
    }
}

function getMetadataClaims() {
    return {
        iss: process.env.HOST,
        aud: process.env.HOST,
    }
}

function createJti() {
    return v4();
}

function createAccessTokenPayload(user: User){
    return {
        ...getMetadataClaims(),
        sub: user.username,
        role: user.role,
        organizationId: user.organizationId,
    }
}

function createRefreshTokenPayload(){
    return {
        ...getMetadataClaims(),
        jti: createJti(),
    }
}

async function getUserNameFromJti(jti?: string){
    const {getRefreshTokenByJti} = RefreshTokenService
    if(!jti) throw new Error('Invalid refresh token')
    const refreshTokenRow = await getRefreshTokenByJti(jti)
    if(!refreshTokenRow) throw new Error('Invalid refresh token')
    return refreshTokenRow.username
}

async function storeRefreshTokenData(username: string, jti: string) {
    const {upsertRefreshToken} = RefreshTokenService
    const refreshTokenRow = await upsertRefreshToken(username, jti)
    return refreshTokenRow
}

function createAccessToken(user: User) {
    const payload = createAccessTokenPayload(user);
    const expiration = process.env.ACCESS_TOKEN_EXPIRATION as string
    const secret = getSecretKeys().access
    return createToken(payload, secret, expiration);
}

function createRefreshToken(user: User) {
    const payload = createRefreshTokenPayload();
    const expiration = process.env.REFRESH_TOKEN_EXPIRATION as string
    const secret = getSecretKeys().refresh
    void storeRefreshTokenData(user.username, payload.jti)
    return createToken(payload, secret, expiration);
}

async function exchangeToken(cognitoAccessToken: string) {
    await verifyCognitoToken(cognitoAccessToken);
    const user = await getUserInfo(cognitoAccessToken);
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    return {accessToken, refreshToken, user}
}

async function verifyAccessTokenAndGetUsername(token: string) {
    const secret = getSecretKeys().access
    const decodedToken = verifyToken(token, secret)
    const username = decodedToken.sub
    if(!username) throw new Error(`Invalid access token: username claim is missing: ${username}`)
    return username
}

async function verifyRefreshTokenAndGetUsername(token: string) {
    const secret = getSecretKeys().refresh
    const decodedToken = verifyToken(token, secret)
    const jti = decodedToken.jti
    const username = await getUserNameFromJti(jti)
    return username
}

async function refreshAccessToken(refreshToken: string) {
    const username = await verifyRefreshTokenAndGetUsername(refreshToken)
    const user = await getUserInfoFromUsername(username)
    const accessToken = createAccessToken(user)
    return {accessToken, user}
}

async function invalidateRefreshToken(token: string) {
    const {deleteRefreshTokenByJti} = RefreshTokenService
    const secret = getSecretKeys().refresh
    const decodedToken = verifyToken(token, secret)
    const jti = decodedToken.jti
    if(jti){
        await deleteRefreshTokenByJti(jti)
    }
}

export const AuthService = {
    exchangeToken,
    verifyAccessTokenAndGetUsername,
    refreshAccessToken,
    invalidateRefreshToken,
}
