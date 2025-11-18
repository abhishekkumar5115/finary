"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../email/email.service");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = __importStar(require("bcrypt"));
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let AuthService = class AuthService {
    userService;
    jwtService;
    emailService;
    userRepository;
    constructor(userService, jwtService, emailService, userRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.userRepository = userRepository;
    }
    async register(createUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
            is_email_verified: false,
            otp_code: otp,
            otp_expires_at: expirationTime,
        });
        const savedUser = await this.userRepository.save(user);
        try {
            await this.emailService.sendOtpEmail(savedUser.email, otp);
        }
        catch (error) {
            console.error('Failed to send email for user:', savedUser.id);
        }
        return {
            message: 'OTP sent to email. Please verify to continue.',
        };
    }
    async verifyOtp(email, otp) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user)
            throw new common_1.UnauthorizedException('User Not Found!');
        if (user.otp_code !== otp)
            throw new common_1.UnauthorizedException('Invalid OTP');
        if (!user.otp_expires_at || new Date() > user.otp_expires_at)
            throw new common_1.UnauthorizedException('OTP has Expired!');
        user.is_email_verified = true;
        user.otp_code = null;
        user.otp_expires_at = null;
        await this.userRepository.save(user);
        return { message: 'Email verified successfully.' };
    }
    async validateUser(LoginUserDto) {
        const user = await this.userService.findOneEmail(LoginUserDto.email);
        if (!user)
            throw new common_1.UnauthorizedException("user doesn't exist");
        if (!user.is_email_verified)
            throw new common_1.UnauthorizedException('Please verify your email first.');
        const validPassword = await bcrypt.compare(LoginUserDto.password, user.password);
        if (!validPassword)
            throw new common_1.UnauthorizedException('Incorrect Password');
        const { password, ...result } = user;
        return result;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async resendOtpVerification(email) {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User does not exist.');
        }
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        user.otp_code = newOtp;
        user.otp_expires_at = expiresAt;
        await this.userRepository.save(user);
        try {
            await this.emailService.sendOtpEmail(user.email, newOtp);
        }
        catch (error) {
            console.error("Failed to resend OTP email for user:", user.id);
        }
        return { message: "OTP resent successfully." };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        email_service_1.EmailService,
        typeorm_1.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map