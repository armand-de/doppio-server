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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const verify_entity_1 = require("./entity/verify.entity");
const twilio_1 = __importDefault(require("twilio"));
const config_1 = require("@nestjs/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const response = { success: true };
let AuthService = class AuthService {
    constructor(verifyRepository, configService, userService, jwtService) {
        this.verifyRepository = verifyRepository;
        this.configService = configService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async joinUser({ phone }) {
        var _a;
        try {
            const verifyNumber = this.getVerifyNumber();
            const object = { phone, verifyNumber };
            const id = (_a = (await this.getVerifyUserIdByPhone(phone))) === null || _a === void 0 ? void 0 : _a.id;
            if (id) {
                await this.updateVerifyNumberById({ id, verifyNumber });
            }
            else {
                await this.createVerifyUser(object);
            }
            await this.sendVerifyMessage(object);
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        }
        return response;
    }
    async verifyUser({ nickname, password: plainPassword, phone, verifyNumber, }) {
        try {
            const verify = await this.verifyRepository.findOne({
                where: { phone, verifyNumber },
                select: ['id'],
            });
            if (verify) {
                const password = await this.encryptPassword(plainPassword);
                await this.userService.createUser({
                    phone,
                    nickname,
                    password,
                });
                await this.verifyRepository.delete(verify);
            }
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        }
        return response;
    }
    async getJwtAccessToken(payload) {
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
    async createVerifyUser(createVerifyUserDto) {
        const newVerifyUser = await this.verifyRepository.create(createVerifyUserDto);
        await this.verifyRepository.save(newVerifyUser).catch((err) => {
            throw new Error(err);
        });
    }
    async updateVerifyNumberById({ id, verifyNumber, }) {
        await this.verifyRepository.save({ id, verifyNumber });
    }
    async getVerifyUserIdByPhone(phone) {
        return await this.verifyRepository.findOne({
            where: { phone },
            select: ['id'],
        });
    }
    async encryptPassword(password) {
        return await new Promise((resolve, reject) => {
            bcrypt_1.default.genSalt(12, (err, salt) => {
                if (err)
                    reject(err);
                bcrypt_1.default.hash(password, salt, (err, hash) => {
                    if (err)
                        reject(err);
                    resolve(hash);
                });
            });
        });
    }
    getVerifyNumber() {
        const CHARS = '0123456789';
        const VERIFY_NUMBER_LENGTH = 6;
        let verifyNumber = '';
        for (let i = 0; i < VERIFY_NUMBER_LENGTH; i++) {
            const n = Math.floor(Math.random() * CHARS.length);
            verifyNumber += CHARS.substring(n, n + 1);
        }
        return verifyNumber;
    }
    async sendVerifyMessage({ phone, verifyNumber, }) {
        const client = await new twilio_1.default(this.configService.get('TWILIO_ACCOUNT_SID'), this.configService.get('TWILIO_AUTH_TOKEN'));
        await client.messages.create({
            body: `인증번호: ${verifyNumber}`,
            to: `+82${phone.substring(1, phone.length)}`,
            from: this.configService.get('TWILIO_NUMBER'),
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(verify_entity_1.Verify)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map