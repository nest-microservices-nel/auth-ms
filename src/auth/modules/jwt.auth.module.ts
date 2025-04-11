import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';

@Module({
  imports: [
    NatsModule,
    JwtModule.register({
      global: true,
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class JwtAuthModule {}
