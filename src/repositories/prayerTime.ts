import { prisma } from "./client";

async function findByTimeAndOrganization (time: Date, organizationId: number) {
  const startTime = new Date (time)
  startTime.setHours(0, 0, 0, 0)
  const endTime = new Date(time)
  endTime.setHours(23, 59, 59, 999)
  const PrayerTime = await prisma.prayerTime.findMany({
    where: {
      time: {
        gte: startTime,
        lte: endTime,
      },
      organizationId,
    }
  })
  return PrayerTime
}

async function create ({ organizationId }:{ organizationId: number, }) {
  const PrayerTime = await prisma.prayerTime.create({
    data: { name }
  })
  return PrayerTime
}

export const PrayerTimeRepository = {
  findByTimeAndOrganization,
  create
}

