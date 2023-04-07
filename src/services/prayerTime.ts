import { PrayerTimeRepository } from '../repositories/prayerTime'


async function getByTimeAndOrganization({time, organizationId}: {time: Date, organizationId: string}) {
  const {findByTimeAndOrganization} = PrayerTimeRepository
  const prayerTime = await findByTimeAndOrganization({time, organizationId})
  if (!prayerTime) {
    throw new Error(`can't find organization for {time, organizationId}: ${{time, organizationId}}`)
  }
  return prayerTime
}

async function createTime(
  { time, organizationId, prayerTypeId, prayerCallId}:
  { time: Date, organizationId: string, prayerTypeId: string, prayerCallId: string}
) {
  const {create} = PrayerTimeRepository
  const prayerTime = await create(
    { time, organizationId, prayerTypeId, prayerCallId}
    )
  if (!prayerTime) {
    throw new Error(`can't create organization with { time, organizationId, prayerTypeId, prayerCallId}: ${{ time, organizationId, prayerTypeId, prayerCallId}}`)
  }
  return prayerTime
}

async function updateTime(
  { time, organizationId, prayerTypeId, prayerCallId, publicId}:
  { time: Date, organizationId: string, prayerTypeId: string, prayerCallId: string, publicId: string}
) {
  const {update} = PrayerTimeRepository
  const prayerTime = await update(
    { time, organizationId, prayerTypeId, prayerCallId, publicId}
    )
  if (!prayerTime) {
    throw new Error(`can't create organization with { time, organizationId, prayerTypeId, prayerCallId, publicId}: ${{ time, organizationId, prayerTypeId, prayerCallId, publicId}}`)
  }
  return prayerTime
}

export const PrayerTimeService =  {
  getByTimeAndOrganization,
  createTime,
  updateTime,
}