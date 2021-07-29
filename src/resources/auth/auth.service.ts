import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) {}

  /**
   * Validate User Credentials
   * @param email 
   * @param password 
   * @returns 
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ where: { email: email }});
    // Check password
    if (user && bcrypt.compareSync(password, String(user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * 
   * @param user Login to user account
   * @returns 
   */
  async login(user: User|any) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY, expiresIn: "24h" }),
    };
  }

  /**
   * 
   * @param user Login to user account
   * @returns 
   */
  async register(dto: RegisterDto) {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    user.active = false;
    user.suspendedAt = null;
    user.deletedAt = null;
    return await this.userService.create(user);
  }
}
