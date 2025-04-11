import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto, LoginUserDto } from './dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
// import { hashPassword } from '../utils/password-hash.util';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { envs } from 'src/config';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('authServices');

  constructor(private jwtService: JwtService) {
    super();
  }

  onModuleInit() {
    // onModuleInit is a NetsJS function. it helps us to initialize a custom code when the module is started
    this.$connect();
    this.logger.log('Prisma auth started');
  }

  async jwtSign(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync({
      id: payload.id,
      email: payload.email,
    });
  }

  async jwtVerify(token: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { iat, exp, ...payload } = await this.jwtService.verifyAsync(
        token,
        {
          secret: envs.jwtSecret,
        },
      );

      const newToken = await this.jwtSign(payload);

      return { user: payload, token: newToken };
    } catch {
      throw new RpcException({
        message: new UnauthorizedException().message,
        status: 401,
      });
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.getUserByEmail(loginUserDto?.email);

    if (!user) {
      throw new RpcException({
        status: 400,
        message: 'Password or email are wrong, check them.',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new RpcException({
        status: 400,
        message: 'Password or email are wrong, check them.',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: __, ...rest } = user;

    const payload = { id: user.id, email: user.email };

    const token = await this.jwtSign(payload);
    return {
      user: rest,
      token,
    };
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, password } = registerUserDto;

    const user = await this.getUserByEmail(email);

    if (user) {
      throw new RpcException({
        status: 400,
        message: 'User already exist.',
      });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hashSync(password, salt);

    const newUser = await this.users.create({
      data: { ...registerUserDto, password: hash },
    });

    const token = await this.jwtSign({ id: newUser.id, email: newUser.email });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userData } = newUser;

    return { user: userData, token };
  }

  async verifyUser(token: string) {
    const payload = await this.jwtVerify(token);
    return payload;
  }

  async getUserByEmail(email: string) {
    return this.users.findUnique({
      where: {
        email,
      },
    });
  }
}
