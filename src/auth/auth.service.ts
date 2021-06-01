import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { JoinResponse } from './interface/join-response.interface';
import { Verify } from './entity/verify.entity';
import twilio from 'twilio';
import { ConfigService } from '@nestjs/config';
import { JoinUserDto } from './dto/join-user.dto';
import bcrypt from 'bcrypt';
import { CreateVerifyUserDto } from './dto/create-verify-user.dto';
import { StatusResponse } from './interface/status-response.interface';
import { VerifyUserDto } from './dto/verify-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { GetJwtAccessTokenDto } from './dto/get-jwt-access-token.dto';
import { UpdateVerifyUserDto } from './dto/update-verify-user.dto';
import { SUCCESS_RESPONSE } from '../utils/success-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Verify) private verifyRepository: Repository<Verify>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async joinUser({ phone }: JoinUserDto): Promise<JoinResponse> {
    try {
      const verifyNumber = this.getVerifyNumber();
      const object = { phone, verifyNumber };
      const id = (await this.getVerifyUserIdByPhone(phone))?.id;
      if (id) {
        await this.updateVerifyNumberById({ id, verifyNumber });
      } else {
        await this.createVerifyUser(object);
      }
      await this.sendVerifyMessage(object);
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  async verifyUser({
    nickname,
    password: plainPassword,
    phone,
    verifyNumber,
  }: VerifyUserDto): Promise<StatusResponse> {
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
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  async getJwtAccessToken(payload: GetJwtAccessTokenDto): Promise<string> {
    return this.jwtService.sign(payload);
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

  private async getVerifyUserIdByPhone(phone: string): Promise<Verify> {
    return await this.verifyRepository.findOne({
      where: { phone },
      select: ['id'],
    });
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const client = await new twilio(
      this.configService.get<string>('TWILIO_ACCOUNT_SID'),
      this.configService.get<string>('TWILIO_AUTH_TOKEN'),
    );

    await client.messages.create({
      body: `인증번호: ${verifyNumber}`,
      to: `+82${phone.substring(1, phone.length)}`,
      from: this.configService.get<string>('TWILIO_NUMBER'),
    });
  }
}
