import 'fastify';
import {User} from './user'

declare module 'fastify' {
    interface FastifyRequest {
        user?: User;
    }
}