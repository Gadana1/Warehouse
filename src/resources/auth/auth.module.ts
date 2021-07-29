import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/auth.strategy.jwt';
import { LocalStrategy } from './strategy/auth.strategy.local';

@Module({
  imports: [ 
    UserModule,
    PassportModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
