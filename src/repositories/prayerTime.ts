import { prisma } from "./client";

async function findByTimeAndOrganization ({time, organizationId}: {time: Date, organizationId: string}) {
  const newDate = new Date(time.valueOf())
  const tomorrow = new Date((newDate).setDate((newDate).getDate() + 1),)
  
  const PrayerTime = await prisma.prayerTime.findMany({
    where: {
      time: {
        gte: new Date(time.getTime() + time.getTimezoneOffset() * 60 * 1000),
        lte: new Date(tomorrow.getTime() + tomorrow.getTimezoneOffset() * 60 * 1000),
      },
      organization: {publicId: organizationId},
    },
    include: {
      prayerType: {
        select: {
          publicId: true,
        },
      },
      prayerCall: {
        select: {
          publicId: true,
        },
      },
      organization: {
        select: {
          publicId: true,
        },
      },
    },
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

