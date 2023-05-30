import { RefreshTokenRepository } from '../repositories/token'

async function getRefreshTokenByJti(jti: string) {
    const { getRefreshTokenByJti } = RefreshTokenRepository
    const refreshTokenRow = await getRefreshTokenByJti(jti)
    return refreshTokenRow
}

async function upsertRefreshToken(username: string, jti: string) {
  const { upsertRefreshToken } = RefreshTokenRepository
  const refreshTokenRow = await upsertRefreshToken(username, jti)
  return refreshTokenRow
}

async function deleteRefreshTokenByJti(jti: string) {
  const { deleteRefreshTokenByJti } = RefreshTokenRepository
  const refreshTokenRow = await deleteRefreshTokenByJti(jti)
  return refreshTokenRow
}

export const RefreshTokenService = {
    getRefreshTokenByJti,
    upsertRefreshToken,
    deleteRefreshTokenByJti
}