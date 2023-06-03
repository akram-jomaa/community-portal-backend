import { prisma } from "./client";

async function findById (id: number) {
  const organization = await prisma.organization.findUnique({
    where: { id }
  })
  return organization
}

async function findByPublicId (publicId: string) {
  const organization = await prisma.organization.findUnique({
    where: { publicId }
  })
  return organization
}

async function create (name: string) {
  const organization = await prisma.organization.create({
    data: { name }
  })
  return organization
}

async function findAll () {
  const organizations = await prisma.organization.findMany()
  return organizations
}

export const OrganizationRepository = {
  findById,
  findByPublicId,
  create,
  findAll
}

