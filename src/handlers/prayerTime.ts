import { PrayerTime } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PrayerTimeService } from '../services/prayerTime'


type GetByIdRequest = FastifyRequest<{
    Params: { time: string, organizationId: string }
  }>

type CreateTimeRequest = FastifyRequest<{
    Body: { time: string, date: string, organizationId: string, prayerTypeId: string, prayerCallId: string }
  }>

type UpdateTimeRequest = FastifyRequest<{
    Body: { time: string, date: string, organizationId: string, prayerTypeId: string, prayerCallId: string, publicId: string }
  }>

//   Spring - Java this is called data transfer objects
//  Django - Python this is called serializers
interface PrayerTimeDTO {
  organizationId: string,
  publicId: string,
  prayerTypeId: string,
  prayerCallId: string,
  time: Date
}
type extendedPrayerTime = PrayerTime &     {prayerType: {
  publicId: string;
};
prayerCall: {
  publicId: string;
};
organization: {
  publicId: string;
}};
function mapPrayerTimeToDTO(prayerTimes: extendedPrayerTime[]) : PrayerTimeDTO[] {
    return prayerTimes.map((prayerTime) => ({
      publicId: prayerTime.publicId,
      prayerTypeId: prayerTime.prayerType.publicId,
      prayerCallId: prayerTime.prayerCall.publicId,
      organizationId: prayerTime.organization.publicId,
      time: prayerTime.time,
    }))
}

async function getByTimeAndOrganizationHandler (req: GetByIdRequest, res: FastifyReply) {
    const {getByTimeAndOrganization} = PrayerTimeService
    const {time, organizationId} = req.params

    const prayerTimes = await getByTimeAndOrganization({time: new Date(time), organizationId} )

    const prayerTimeDto= mapPrayerTimeToDTO(prayerTimes)

    res.status(200).send(prayerTimeDto)
}

async function createHandler (req: CreateTimeRequest, res: FastifyReply) {
    const {createTime} = PrayerTimeService
    const { time, date, organizationId, prayerTypeId, prayerCallId } = req.body

    const prayerType = await createTime({time: new Date(`${date}:${time}`), organizationId, prayerTypeId, prayerCallId})

    res.status(201).send(prayerType)
}

async function updateHandler (req: UpdateTimeRequest, res: FastifyReply) {
    const {updateTime} = PrayerTimeService
    const { time, date, organizationId, prayerTypeId, prayerCallId, publicId } = req.body

    const prayerType = await updateTime({time: new Date(`${date}:${time}`), organizationId, prayerTypeId, prayerCallId, publicId})

    res.status(201).send(prayerType)
}


export const PrayerTimeHandler = {
  getByTimeAndOrganizationHandler,
  createHandler,
  updateHandler
}