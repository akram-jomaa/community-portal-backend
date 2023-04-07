import { PrayerCall } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PrayerCallService } from '../services/prayerCall'


type GetByIdRequest = FastifyRequest<{
    Params: { id: string }
  }>

type CreateForNameRequest = FastifyRequest<{
    Body: { name: string }
  }>

//   Spring - Java this is called data transfer objects
//  Django - Python this is called serializers
interface PrayerCallDTO {
    publicId: string,
    name: string
}

function mapPrayerCallToDTO(prayerCall: PrayerCall) : PrayerCallDTO {
    return {
        publicId: prayerCall.publicId,
        name: prayerCall.name,
    }
}

async function getByIdHandler (req: GetByIdRequest, res: FastifyReply) {
    const {getByPublicId} = PrayerCallService
    const {id} = req.params

    const prayerCall = await getByPublicId(id)

    const prayerCallDto= mapPrayerCallToDTO(prayerCall)

    res.status(200).send(prayerCallDto)
}

async function createHandler (req: CreateForNameRequest, res: FastifyReply) {
    const {createFromName} = PrayerCallService
    const { name } = req.body

    const prayerCall = await createFromName(name)

    res.status(201).send(prayerCall)
}


export const PrayerCallHandler = {
    getByIdHandler,
    createHandler
}