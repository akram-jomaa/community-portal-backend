import { FastifyRequest } from 'fastify';
import { getUserInfoFromUsername } from "../utils/authentication/cognito";
import {getBearerToken} from '../utils/authentication/utils'
import {AuthService} from '../services/auth'

export async function verifyTokenAndGetUser<T extends FastifyRequest = FastifyRequest>(req: T) {
    const {verifyAccessTokenAndGetUsername} = AuthService
    const accessToken = getBearerToken(req.headers?.authorization);
    const username = await verifyAccessTokenAndGetUsername(accessToken);
    const user = await getUserInfoFromUsername(username);
    req.user = user
}
