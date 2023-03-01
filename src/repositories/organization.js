"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRepository = void 0;
const client_1 = require("./client");
async function findById(id) {
    const organization = await client_1.prisma.organization.findUnique({
        where: { id }
    });
    return organization;
}
exports.OrganizationRepository = {
    findById
};
