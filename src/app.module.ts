import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';


import { AppController } from './app.controller';
import { AppService } from './app.service';

import { JwtAuthGuard } from './guards/jwt/jwt.guard';
import { PermissionGuard } from './guards/permission/permission.guard';

import { UserModule } from './resources/user/user.module';
import { RoleModule } from './resources/role/role.module';
import { AuthModule } from './resources/auth/auth.module';
import { ProductModule } from './resources/product/product.module';
import { WarehouseModule } from './resources/warehouse/warehouse.module';
import { WarehouseProductModule } from './resources/warehouse-product/warehouse-product.module';

import { AppConfig } from './configs/app';
import { OrmConfig } from './configs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: +AppConfig.throttleTTL,
      limit: +AppConfig.throttleLimit,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => OrmConfig
    }),
    UserModule,
    RoleModule,
    AuthModule,
    ProductModule,
    WarehouseModule,
    WarehouseProductModule,
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
    // Global Throttling
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
