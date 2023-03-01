import { OrganizationRepository } from '../repositories/organization'


async function getById(id:number) {
  const {findById} = OrganizationRepository
  const organization = await findById(id)
  if (!organization) {
    throw new Error(`can't find organization for id: ${id}`)
  }
  return organization
}

export const OrganizationService =  {
  getById,
}