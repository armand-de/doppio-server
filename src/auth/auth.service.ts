import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JoinResponse } from './interface/join-response.interface';
import { Verify } from './entity/verify.entity';
import twilio from 'twilio';
import { ConfigService } from '@nestjs/config';
import { JoinUserDto } from './dto/join-user.dto';
import bcrypt from 'bcrypt';
import { SaveVerifyUserDto } from './dto/save-verify-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Verify) private verifyRepository: Repository<Verify>,
    private readonly configService: ConfigService,
  ) {}

  async joinUser({
    phone,
    password: plainPassword,
  }: JoinUserDto): Promise<JoinResponse> {
    let response: JoinResponse = {
      success: true,
    };
    try {
      const verifyNumber = this.getVerifyNumber();
      const password = await this.encryptPassword(plainPassword);

      await this.saveVerifyUser({ phone, password, verifyNumber });
      await this.sendVerifyMessage({ phone, verifyNumber });
    } catch (err) {
      response = { success: false, err };
    }
    return response;
  }

  private async saveVerifyUser(
    saveVerifyUserDto: SaveVerifyUserDto,
  ): Promise<void> {
    const verifyUser = await this.verifyRepository.create(saveVerifyUserDto);
    await this.verifyRepository
      .save(verifyUser)
      .then(() => console.log(`${saveVerifyUserDto.phone} is registered.`))
      .catch(() => {
        throw new HttpException(
          'Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
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

  private async sendVerifyMessage({ phone, verifyNumber }): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const client = new twilio(
      this.configService.get<string>('TWILIO_ACCOUNT_SID'),
      this.configService.get<string>('TWILIO_AUTH_TOKEN'),
    );

    client.messages
      .create({
        body: `인증번호: ${verifyNumber}`,
        to: `+82${phone.substring(1, phone.length)}`,
        from: this.configService.get<string>('TWILIO_NUMBER'),
      })
      .then((msg) => console.log(msg.sid));
  }
}
