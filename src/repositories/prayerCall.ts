import { prisma } from "./client";

async function findById (id: number) {
  const PrayerCall = await prisma.prayerCall.findUnique({
    where: { id }
  })
  return PrayerCall
}

async function findByPublicId (publicId: string) {
  const PrayerCall = await prisma.prayerCall.findUnique({
    where: { publicId }
  })
  return PrayerCall
}

async function create (name: string) {
  const PrayerCall = await prisma.prayerCall.create({
    data: { name }
  })
  return PrayerCall
}

export const PrayerCallRepository = {
  findById,
  findByPublicId,
  create
}

