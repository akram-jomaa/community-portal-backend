import { prisma } from "./client";

async function findByTimeAndOrganization ({time, organizationId}: {time: Date, organizationId: number}) {
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

async function create (
  { time, organizationId, prayerTypeId, prayerCallId}:
  { time: Date, organizationId: string, prayerTypeId: string, prayerCallId: string}
  ) {
  const PrayerTime = await prisma.prayerTime.create({
    data: {
      time,
      organization: {
        connect: { publicId: organizationId },
      },
      prayerType: {
        connect: { publicId: prayerTypeId },
      },
      prayerCall: {
        connect: { publicId: prayerCallId },
      },
    },
  })
  return PrayerTime
}

async function update (
  { time, organizationId, prayerTypeId, prayerCallId, publicId}:
  { time: Date, organizationId: string, prayerTypeId: string, prayerCallId: string, publicId: string}
  ) {
  const PrayerTime = await prisma.prayerTime.update({
    where: { publicId },
    data: {
      time,
      organization: {
        connect: { publicId: organizationId },
      },
      prayerType: {
        connect: { publicId: prayerTypeId },
      },
      prayerCall: {
        connect: { publicId: prayerCallId },
      },
    },
  })
  return PrayerTime
}

export const PrayerTimeRepository = {
  findByTimeAndOrganization,
  create,
  update
}

