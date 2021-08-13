import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request as HttpRequest } from 'express';
import { LocalAuthGuard } from '../../guards/local/local.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Login to get JWT access token
   * @param req
   */
  @Throttle(3, 60)
  @ApiOperation({
    summary: "Login to get JWT access token",
  })
  @ApiBody({
    type: LoginDto
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: HttpRequest) {
    return this.authService.login(req.user);
  }

  /**
   * Register new user
   * @param req
   */
  @Throttle(3, 60)
  @ApiOperation({
    summary: "Register new user",
  })
  @ApiBody({
    type: RegisterDto
  })
  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
