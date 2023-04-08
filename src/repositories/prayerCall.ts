import { prisma } from "./client";

async function findAll () {
  const PrayerCalls = await prisma.prayerCall.findMany()
  return PrayerCalls
}

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
  findAll,
  findById,
  findByPublicId,
  create
}

