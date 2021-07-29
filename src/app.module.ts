import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resources/user/user.module';
import { RoleModule } from './resources/role/role.module';
import { AuthModule } from './resources/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt/jwt.guard';
import { PermissionGuard } from './guards/permission/permission.guard';
import * as ormconfig from './configs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ormconfig
    }),
    UserModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Global JWT Authentication 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Global RBAC Authorization
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
