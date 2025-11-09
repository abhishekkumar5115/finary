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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const client_entity_1 = require("../clients/entities/client.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("./entities/invoice.entity");
const user_entity_1 = require("../users/entities/user.entity");
const config_1 = require("@nestjs/config");
const razorpay_1 = __importDefault(require("razorpay"));
let InvoicesService = class InvoicesService {
    clientRepository;
    invoiceRepository;
    userRepository;
    configService;
    razorpay;
    constructor(clientRepository, invoiceRepository, userRepository, configService) {
        this.clientRepository = clientRepository;
        this.invoiceRepository = invoiceRepository;
        this.userRepository = userRepository;
        this.configService = configService;
        this.razorpay = new razorpay_1.default({
            key_id: this.configService.get('RAZORPAY_KEY_ID'),
            key_secret: this.configService.get('RAZORPAY_KEY_SECRET')
        });
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
    async createPaymentOrder(invoiceId) {
        const invoice = await this.invoiceRepository.findOne({ where: { id: invoiceId } });
        if (!invoice)
            throw new common_1.NotFoundException("Invoice Not Found!");
        const options = {
            amount: invoice.amount * 100,
            currency: 'INR',
            receipt: invoice.id,
        };
        try {
            const order = await this.razorpay.orders.create(options);
            return order;
        }
        catch (error) {
            throw new error('Failed to create new order');
        }
    }
    async findAll() {
        return await this.invoiceRepository.find({
            relations: ['client']
        });
    }
    findOne(id) {
        return this.invoiceRepository.findOne({
            where: { id: id },
            relations: ['client']
        });
    }
    update(id, updateInvoiceDto) {
        return `This action updates a #${id} invoice`;
    }
    async updateInvoiceStatus(id, status) {
        const invoice = await this.invoiceRepository.findOne({ where: { id: id } });
        if (!invoice) {
            throw new common_1.NotFoundException("Invoice Not found!");
        }
        invoice.status = status;
        return this.invoiceRepository.save(invoice);
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
        typeorm_2.Repository,
        config_1.ConfigService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map