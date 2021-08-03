import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfig } from '../../configs/app';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/auth.strategy.jwt';
import { LocalStrategy } from './strategy/auth.strategy.local';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ 
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: AppConfig.jwtSecretKey,
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should have accss_token', () => {
    expect(service.login({id: 1})).toMatchObject({access_token: ''});
  });
});
