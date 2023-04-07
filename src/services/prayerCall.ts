import { PrayerCallRepository } from '../repositories/prayerCall'


async function getById(id:number) {
  const {findById} = PrayerCallRepository
  const prayerCall = await findById(id)
  if (!prayerCall) {
    throw new Error(`can't find prayerCall for id: ${id}`)
  }
  return prayerCall
}

async function getByPublicId(id:string) {
  const {findByPublicId} = PrayerCallRepository
  const prayerCall = await findByPublicId(id)
  if (!prayerCall) {
    throw new Error(`can't find prayerCall for id: ${id}`)
  }
  return prayerCall
}

async function createFromName(name:string) {
  const {create} = PrayerCallRepository
  const prayerCall = await create(name)
  if (!prayerCall) {
    throw new Error(`can't create prayerCall with name: ${name}`)
  }
  return prayerCall
}

export const PrayerCallService =  {
  getById,
  getByPublicId,
  createFromName
}