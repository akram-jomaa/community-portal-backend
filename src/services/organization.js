"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const organization_1 = require("../repositories/organization");
async function getById(id) {
    const { findById } = organization_1.OrganizationRepository;
    const organization = await findById(id);
    if (!organization) {
        throw new Error(`can't find organization for id: ${id}`);
    }
    return organization;
}
exports.OrganizationService = {
    getById,
};
