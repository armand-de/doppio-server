import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import twilio from 'twilio';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { JoinResponse } from './interface/join-response.interface';
import { Verify } from './entity/verify.entity';
import { JoinUserDto } from './dto/join-user.dto';
import { CreateVerifyUserDto } from './dto/create-verify-user.dto';
import { IStatusResponse } from '../types/response';
import { VerifyUserDto } from './dto/verify-user.dto';
import { UserService } from '../user/user.service';
import { GetJwtAccessTokenDto } from './dto/get-jwt-access-token.dto';
import { UpdateVerifyUserDto } from './dto/update-verify-user.dto';
import { SUCCESS_RESPONSE } from '../utils/success-response';
import { ChangePasswordVerifyDto } from './dto/change-password-verify.dto';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Verify) private verifyRepository: Repository<Verify>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  client = new twilio(
    this.configService.get<string>('TWILIO_ACCOUNT_SID'),
    this.configService.get<string>('TWILIO_AUTH_TOKEN'),
  );

  async joinUser({ phone }: JoinUserDto): Promise<JoinResponse> {
    try {
      const verifyNumber = this.getVerifyNumber();
      const userPhoneIsExist = !!(await this.userService.getUserByPhone(phone));

      if (userPhoneIsExist) {
        throw 'User phone is exist.';
      }

      const object = { phone, verifyNumber };
      const verifyUserId = await this.getVerifyUserIdByPhone(phone);

      if (verifyUserId) {
        await this.updateVerifyNumberById({ id: verifyUserId, verifyNumber });
      } else {
        await this.createVerifyUser(object);
      }
      await this.sendVerifyMessage(object);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  async verifyUser({
    nickname,
    password: plainPassword,
    phone,
    verifyNumber,
  }: VerifyUserDto): Promise<IStatusResponse> {
    try {
      const verify = await this.verifyRepository.findOne({
        where: { phone, verifyNumber },
        select: ['id'],
      });
      if (!verify) {
        throw 'Invalid verification number.';
      }
      const password = await this.encryptPassword(plainPassword);
      await this.userService.createUser({
        phone,
        nickname,
        password,
      });
      await this.verifyRepository.delete(verify);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  async getJwtAccessToken(payload: GetJwtAccessTokenDto): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async changePasswordRequest(phone: string): Promise<IStatusResponse> {
    try {
      const userPhoneIsExist = !!(await this.userService.getUserByPhone(phone));
      if (!userPhoneIsExist) {
        throw 'User is not exist.';
      }
      const verifyNumber = this.getVerifyNumber();
      const verifyDto = { phone, verifyNumber };
      await this.createVerifyUser(verifyDto);
      await this.sendVerifyMessage(verifyDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  async changePasswordVerify({
    password: plainPassword,
    phone,
    verifyNumber,
  }: ChangePasswordVerifyDto): Promise<IStatusResponse> {
    try {
      const verify = await this.verifyRepository.findOne({
        where: { phone, verifyNumber },
        select: ['id'],
      });
      if (!verify) {
        throw 'Invalid verification number.';
      }
      const user = await this.userService.getUserByPhone(phone);
      const password = await this.encryptPassword(plainPassword);
      await this.userRepository.save({ ...user, password });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  private async createVerifyUser(
    createVerifyUserDto: CreateVerifyUserDto,
  ): Promise<void> {
    const newVerifyUser = await this.verifyRepository.create(
      createVerifyUserDto,
    );
    await this.verifyRepository.save(newVerifyUser).catch((err) => {
      throw new Error(err);
    });
  }

  private async updateVerifyNumberById({
    id,
    verifyNumber,
  }: UpdateVerifyUserDto): Promise<void> {
    await this.verifyRepository.save({ id, verifyNumber });
  }

  private async getVerifyUserIdByPhone(phone: string): Promise<string> {
    return (
      await this.verifyRepository.findOne({
        where: { phone },
        select: ['id'],
      })
    )?.id;
  }

  private async encryptPassword(password: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      bcrypt.genSalt(12, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    });
  }

  private getVerifyNumber(): string {
    const CHARS = '0123456789';
    const VERIFY_NUMBER_LENGTH = 6;
    let verifyNumber = '';

    for (let i = 0; i < VERIFY_NUMBER_LENGTH; i++) {
      const n = Math.floor(Math.random() * CHARS.length);
      verifyNumber += CHARS.substring(n, n + 1);
    }

    return verifyNumber;
  }

  private async sendVerifyMessage({
    phone,
    verifyNumber,
  }: {
    phone: string;
    verifyNumber: string;
  }): Promise<void> {
    await this.client.messages.create({
      body: `인증번호: ${verifyNumber}`,
      to: `+82${phone.substring(1, phone.length)}`,
      from: this.configService.get<string>('TWILIO_NUMBER'),
    });
  }
}
