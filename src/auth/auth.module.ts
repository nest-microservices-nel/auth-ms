import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NatsModule } from 'src/transports/nats.module';

import { JwtAuthModule } from './modules/jwt.auth.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [NatsModule, JwtAuthModule],
})
export class AuthModule {}
