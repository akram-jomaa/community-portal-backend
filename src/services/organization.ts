import { OrganizationRepository } from '../repositories/organization'


async function getById(id:number) {
  const {findById} = OrganizationRepository
  const organization = await findById(id)
  if (!organization) {
    throw new Error(`can't find organization for id: ${id}`)
  }
  return organization
}

async function getByPublicId(id:string) {
  const {findByPublicId} = OrganizationRepository
  const organization = await findByPublicId(id)
  if (!organization) {
    throw new Error(`can't find organization for id: ${id}`)
  }
  return organization
}

async function createFromName(name:string) {
  const {create} = OrganizationRepository
  const organization = await create(name)
  if (!organization) {
    throw new Error(`can't create organization with name: ${name}`)
  }
  return organization
}

export const OrganizationService =  {
  getById,
  getByPublicId,
  createFromName
}