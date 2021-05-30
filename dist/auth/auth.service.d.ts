import { Repository } from 'typeorm';
import { JoinResponse } from './interface/join-response.interface';
import { Verify } from './entity/verify.entity';
import { ConfigService } from '@nestjs/config';
import { JoinUserDto } from './dto/join-user.dto';
import { StatusResponse } from './interface/status-response.interface';
import { VerifyUserDto } from './dto/verify-user.dto';
import { UserService } from '../user/user.service';
import { LoginResponse } from './interface/login-response.interface';
import { JwtService } from '@nestjs/jwt';
import { GetJwtAccessTokenDto } from './dto/get-jwt-access-token.dto';
export declare class AuthService {
    private verifyRepository;
    private readonly configService;
    private readonly userService;
    private readonly jwtService;
    constructor(verifyRepository: Repository<Verify>, configService: ConfigService, userService: UserService, jwtService: JwtService);
    joinUser({ phone }: JoinUserDto): Promise<JoinResponse>;
    verifyUser({ nickname, password: plainPassword, phone, verifyNumber, }: VerifyUserDto): Promise<StatusResponse>;
    getJwtAccessToken(payload: GetJwtAccessTokenDto): Promise<LoginResponse>;
    private createVerifyUser;
    private updateVerifyNumberById;
    private getVerifyUserIdByPhone;
    private encryptPassword;
    private getVerifyNumber;
    private sendVerifyMessage;
}
