import { prisma } from "./client";

async function findById (id: number) {
  const PrayerType = await prisma.prayerType.findUnique({
    where: { id }
  })
  return PrayerType
}

async function findByPublicId (publicId: string) {
  const PrayerType = await prisma.prayerType.findUnique({
    where: { publicId }
  })
  return PrayerType
}

async function create (name: string) {
  const PrayerType = await prisma.prayerType.create({
    data: { name }
  })
  return PrayerType
}

export const PrayerTypeRepository = {
  findById,
  findByPublicId,
  create
}

