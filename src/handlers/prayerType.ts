import { PrayerType } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PrayerTypeService } from '../services/prayerType'


type GetByIdRequest = FastifyRequest<{
    Params: { id: string }
  }>

type CreateForNameRequest = FastifyRequest<{
    Body: { name: string }
  }>

//   Spring - Java this is called data transfer objects
//  Django - Python this is called serializers
interface PrayerTypeDTO {
    publicId: string,
    name: string
}

function mapPrayerTypeToDTO(prayerType: PrayerType) : PrayerTypeDTO {
    return {
        publicId: prayerType.publicId,
        name: prayerType.name,
    }
}

async function getByIdHandler (req: GetByIdRequest, res: FastifyReply) {
    const {getByPublicId} = PrayerTypeService
    const {id} = req.params

    const prayerType = await getByPublicId(id)

    const prayerTypeDto= mapPrayerTypeToDTO(prayerType)

    res.status(200).send(prayerTypeDto)
}

async function createHandler (req: CreateForNameRequest, res: FastifyReply) {
    const {createFromName} = PrayerTypeService
    const { name } = req.body

    const prayerType = await createFromName(name)

    res.status(201).send(prayerType)
}


export const PrayerTypeHandler = {
    getByIdHandler,
    createHandler
}