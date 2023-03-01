import { prisma } from "./client";

async function findById (id: number) {
  const organization = await prisma.organization.findUnique({
    where: { id }
  })
  return organization
}

export const OrganizationRepository = {
  findById
}

