"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationHandler = void 0;
const organization_1 = require("../services/organization");
async function getByIdHandler(req, res) {
    const { getById } = organization_1.OrganizationService;
    const { id: idStr } = req.params;
    const id = parseInt(idStr);
    //TODO: validate that idStr is a proper numebr
    const organization = await getById(id);
    res.status(200).send(organization);
}
exports.OrganizationHandler = {
    getByIdHandler
};
