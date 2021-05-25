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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Verify) private verifyRepository: Repository<Verify>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async joinUser({
    nickname,
    phone,
    password: plainPassword,
  }: JoinUserDto): Promise<JoinResponse> {
    let response: JoinResponse = { success: true };
    try {
      const verifyNumber = this.getVerifyNumber();
      const password = await this.encryptPassword(plainPassword);

      await this.createVerifyUser({ nickname, phone, password, verifyNumber });
      await this.sendVerifyMessage({ phone, verifyNumber });
    } catch (err) {
      response = { success: false, err };
    }
    return response;
  }

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<StatusResponse> {
    let response: StatusResponse = { success: true };
    try {
      const verify = await this.verifyRepository.findOne({
        where: verifyUserDto,
        select: ['nickname', 'phone', 'password'],
      });
      if (verify) {
        await this.userService.createUser(verify);
        await this.verifyRepository.delete(verify);
      }
    } catch (err) {
      response = { success: false, err };
    }
    return response;
  }

  private async createVerifyUser(
    createVerifyUserDto: CreateVerifyUserDto,
  ): Promise<void> {
    const newVerifyUser = await this.verifyRepository.create(
      createVerifyUserDto,
    );
    await this.verifyRepository.save(newVerifyUser).catch(() => {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
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
