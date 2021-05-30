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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserSelectList = ['nickname', 'phone', 'image'];
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(createUserDto) {
        const newUser = await this.userRepository.create(createUserDto);
        await this.userRepository.save(newUser);
    }
    async updateUser(updateUserDto) {
        const { id } = updateUserDto;
        await this.userRepository.update({ id }, updateUserDto);
    }
    async deleteUser(id) {
        await this.userRepository.delete({ id });
    }
    async getAllUsers() {
        return await this.userRepository.find({
            select: getUserSelectList,
        });
    }
    async getUserById(id) {
        return await this.userRepository.findOne({
            where: { id },
            select: getUserSelectList,
        });
    }
    async getUserByPhone(phoneDto) {
        return await this.userRepository.findOne({
            where: phoneDto,
            select: getUserSelectList,
        });
    }
    async getUserByNickname({ nickname }) {
        return await this.userRepository.findOne({ nickname });
    }
    async findByLogin({ nickname, password: input, }) {
        const user = await this.getUserDataByDynamicData({
            where: { nickname },
            select: ['password', ...getUserSelectList],
        });
        if (user &&
            (await this.getIsPasswordEqual({
                input,
                password: user.password,
            }))) {
            delete user['password'];
            return user;
        }
        throw new common_1.UnauthorizedException();
    }
    async getUserIsExistByPhone(phoneDto) {
        return !!(await this.getUserByPhone(phoneDto));
    }
    async getUserIsExistByNickname(nicknameDto) {
        return !!(await this.getUserByNickname(nicknameDto));
    }
    async getIsPasswordEqual({ input, password, }) {
        return await bcrypt_1.default.compare(input, password);
    }
    async getUserDataByDynamicData({ where, select, }) {
        return await this.userRepository.findOne({ where, select });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map