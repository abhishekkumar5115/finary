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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const client_entity_1 = require("../clients/entities/client.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("./entities/invoice.entity");
const user_entity_1 = require("../users/entities/user.entity");
let InvoicesService = class InvoicesService {
    clientRepository;
    invoiceRepository;
    userRepository;
    constructor(clientRepository, invoiceRepository, userRepository) {
        this.clientRepository = clientRepository;
        this.invoiceRepository = invoiceRepository;
        this.userRepository = userRepository;
    }
    async create(createInvoiceDto, userPayload) {
        const user = await this.userRepository.findOne({
            where: { id: userPayload.user_id }
        });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const client = await this.clientRepository.findOne({
            where: {
                id: createInvoiceDto.client_id,
                user: { id: userPayload.user_id }
            },
            relations: ['user']
        });
        if (!client)
            throw new common_1.NotFoundException("Client Not Found");
        const newInvoice = this.invoiceRepository.create({
            amount: createInvoiceDto.amount,
            due_date: createInvoiceDto.due_date,
            invoice_number: 'INV-' + Date.now(),
            status: invoice_entity_1.InvoiceStatus.Draft,
            user,
            client,
        });
        return await this.invoiceRepository.save(newInvoice);
    }
    findAll() {
        return `This action returns all invoices`;
    }
    findOne(id) {
        return `This action returns a #${id} invoice`;
    }
    update(id, updateInvoiceDto) {
        return `This action updates a #${id} invoice`;
    }
    remove(id) {
        return `This action removes a #${id} invoice`;
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __param(1, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map