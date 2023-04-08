import { PrayerCallRepository } from '../repositories/prayerCall'


async function getAll() {
  const {findAll} = PrayerCallRepository
  const prayerCalls = await findAll()
  if (!prayerCalls) {
    throw new Error(`can't find prayerCalls`)
  }
  return prayerCalls
}

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
  getAll,
  getById,
  getByPublicId,
  createFromName
}