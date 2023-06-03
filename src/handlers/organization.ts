import type { Organization } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { OrganizationService } from '../services/organization'

export type GetByIdRequest = FastifyRequest<{
    Params: { id: string }
  }>

type CreateForNameRequest = FastifyRequest<{
    Body: { name: string }
  }>

//   Spring - Java this is called data transfer objects
//  Django - Python this is called serializers
interface OrganizationDTO {
    publicId: string,
    name: string
}

function mapOrganizationToDTO(organization: Organization) : OrganizationDTO {
    return {
        publicId: organization.publicId,
        name: organization.name,
    }
}

async function getByIdHandler (req: GetByIdRequest, res: FastifyReply) {
    const {getByPublicId} = OrganizationService
    const {id} = req.params
    const user = req.user

    if(!user) throw new Error('No user found')

    const organization = await getByPublicId(id)

    const orgnaizationDto= mapOrganizationToDTO(organization)

    res.status(200).send(orgnaizationDto)
}

async function createHandler (req: CreateForNameRequest, res: FastifyReply) {
    const {createFromName} = OrganizationService
    const { name } = req.body

    const organization = await createFromName(name)

    res.status(201).send(organization)
}

async function getAllOrganizationsHandler (req: FastifyRequest, res: FastifyReply) {
    const {getAllOrganizations} = OrganizationService

    const organizations = (await getAllOrganizations()).map(mapOrganizationToDTO)

    res.status(200).send(organizations)
}


export const OrganizationHandler = {
    getByIdHandler,
    createHandler,
    getAllOrganizationsHandler
}