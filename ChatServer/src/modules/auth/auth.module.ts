import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { secret_key_jwt } from '../../../keys/config.json';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: secret_key_jwt,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
