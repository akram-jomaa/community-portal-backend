import {prisma} from './client'

async function getRefreshTokenByJti(jti: string) {
    return prisma.refreshToken.findUnique({
        where: {
            jti
        }
    });
}

async function getRefreshTokenByUsername(username: string) {
    return prisma.refreshToken.findUnique({
        where: {
            username
        }
    });
}

async function upsertRefreshToken(username:string, jti: string) {
    return prisma.refreshToken.upsert({
        where: {
            username
        },
        create: {
            username,
            jti
        },
        update: {
            jti
        }
    });
}

async function deleteRefreshTokenByJti(jti: string) {
    return prisma.refreshToken.delete({
        where: {
            jti
        }
    });
}

export const RefreshTokenRepository = {
    getRefreshTokenByJti,
    getRefreshTokenByUsername,
    upsertRefreshToken,
    deleteRefreshTokenByJti
}
