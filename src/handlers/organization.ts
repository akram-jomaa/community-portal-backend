import { FastifyReply, FastifyRequest } from 'fastify';
import { OrganizationService } from '../services/organization'


type GetByIdRequest = FastifyRequest<{
    Params: { id: string }
  }>

async function getByIdHandler (req: GetByIdRequest, res: FastifyReply) {
    const {getById} = OrganizationService
    const {id: idStr} = req.params

    const  id = parseInt(idStr)

    //TODO: validate that idStr is a proper numebr

    const organization = await getById(id)

    res.status(200).send(organization)
}


export const OrganizationHandler = {
    getByIdHandler
}