import { PrayerTypeRepository } from '../repositories/prayerType'


async function getById(id:number) {
  const {findById} = PrayerTypeRepository
  const prayerType = await findById(id)
  if (!prayerType) {
    throw new Error(`can't find prayerType for id: ${id}`)
  }
  return prayerType
}

async function getByPublicId(id:string) {
  const {findByPublicId} = PrayerTypeRepository
  const prayerType = await findByPublicId(id)
  if (!prayerType) {
    throw new Error(`can't find prayerType for id: ${id}`)
  }
  return prayerType
}

async function createFromName(name:string) {
  const {create} = PrayerTypeRepository
  const prayerType = await create(name)
  if (!prayerType) {
    throw new Error(`can't create prayerType with name: ${name}`)
  }
  return prayerType
}

export const PrayerTypeService =  {
  getById,
  getByPublicId,
  createFromName
}