import { PrayerTime } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PrayerTimeService } from '../services/prayerTime'


type GetByIdRequest = FastifyRequest<{
    Params: { time: Date, organizationId: string }
  }>

type CreateTimeRequest = FastifyRequest<{
    Body: { time: Date, organizationId: string, prayerTypeId: string, prayerCallId: string }
  }>

type UpdateTimeRequest = FastifyRequest<{
    Body: { time: Date, organizationId: string, prayerTypeId: string, prayerCallId: string, publicId: string }
  }>

//   Spring - Java this is called data transfer objects
//  Django - Python this is called serializers
interface PrayerTimeDTO {
  organizationId: string,
  time: Date
}

function mapPrayerTimeToDTO(prayerTimes: PrayerTime[]) : PrayerTimeDTO[] {
    return prayerTimes.map((prayerTime) => ({
      organizationId: prayerTime.publicId,
      time: prayerTime.time,
    }))
}

async function getByTimeAndOrganizationHandler (req: GetByIdRequest, res: FastifyReply) {
    const {getByTimeAndOrganization} = PrayerTimeService
    const {time, organizationId} = req.params

    const prayerTimes = await getByTimeAndOrganization({time, organizationId} )

    const prayerTimeDto= mapPrayerTimeToDTO(prayerTimes)

    res.status(200).send(prayerTimeDto)
}

async function createHandler (req: CreateTimeRequest, res: FastifyReply) {
    const {createTime} = PrayerTimeService
    const { time, organizationId, prayerTypeId, prayerCallId } = req.body

    const prayerType = await createTime({time, organizationId, prayerTypeId, prayerCallId})

    res.status(201).send(prayerType)
}

async function updateHandler (req: UpdateTimeRequest, res: FastifyReply) {
    const {updateTime} = PrayerTimeService
    const { time, organizationId, prayerTypeId, prayerCallId, publicId } = req.body

    const prayerType = await updateTime({time, organizationId, prayerTypeId, prayerCallId, publicId})

    res.status(201).send(prayerType)
}


export const PrayerTypeHandler = {
  getByTimeAndOrganizationHandler,
  createHandler,
  updateHandler
}