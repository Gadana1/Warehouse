import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  /**
   * Verify user credentials - Called by passport Local strategy flow
   * @param username 
   * @param password 
   * @returns {Promise<any>}
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (user) {

      // Check if active
      if (user && !user.active) {
        throw new UnauthorizedException("This user account is still pending verification. Please wait or contact administrator")
      }

      // Check if suspended
      if (user && user.suspendedAt && user.suspendedAt.getTime() <= (new Date()).getTime()) {
        throw new UnauthorizedException("This user account has been suspended or rejected. Please contact administrator")
      }

      return user;
    }
    
    throw new UnauthorizedException();
  }
}