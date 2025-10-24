"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/entities/user.entity");
const client_entity_1 = require("./entities/client.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ClientsService = class ClientsService {
    clientRepository;
    userRepository;
    constructor(clientRepository, userRepository) {
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
    }
    create(createClientDto, userPayload) {
        const newClient = this.clientRepository.create({
            ...createClientDto,
            user: { id: userPayload.userId },
        });
        return this.clientRepository.save(newClient);
    }
    async findAll(user) {
        return await this.clientRepository.findBy({ user: { id: user.id } });
    }
    findOne(id, user) {
        return `This action returns a #${id} client`;
    }
    async update(id, updateClientDto, user) {
        const client = await this.clientRepository.findOneBy({
            id,
            user: { id: user.id },
        });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        Object.assign(client, updateClientDto);
        return this.clientRepository.save(client);
    }
    remove(id) {
        return `This action removes a #${id} client`;
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ClientsService);
//# sourceMappingURL=clients.service.js.map