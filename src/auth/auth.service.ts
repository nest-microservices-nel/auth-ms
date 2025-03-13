import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto } from './dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
// import { hashPassword } from '../utils/password-hash.util';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('authServices');

  onModuleInit() {
    this.$connect();
    this.logger.log('Prisma auth started');
  }
  loginUser(loginUserDto: LoginUserDto) {
    return loginUserDto;
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, password } = registerUserDto;
    console.log(
      '🚀 ~ AuthService ~ registerUser ~ registerUserDto:',
      registerUserDto,
    );

    const user = await this.getUserByEmail(email);

    if (user) {
      throw new RpcException({
        status: 400,
        message: 'User already exist.',
      });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hashSync(password, salt);

    return await this.user.create({
      data: { ...registerUserDto, password: hash },
    });
  }

  verifyUser() {
    return 'verify user';
  }

  async getUserByEmail(email: string) {
    return this.user.findUnique({
      where: {
        email,
      },
    });
  }
}
