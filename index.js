"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const organization_1 = require("./src/handlers/organization");
const server = (0, fastify_1.default)();
server.register(cors_1.default, {
// put your options here
});
server.get('/api/v1/organization/:id', organization_1.OrganizationHandler.getByIdHandler);
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
