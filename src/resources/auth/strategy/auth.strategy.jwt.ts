import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { AppConfig } from '../../../configs/app';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AppConfig.jwtSecretKey,
    });
  }

  /**
   * Validate jwt payload - Called by passport JWT strategy flow
   *
   * @param payload
   * @returns {Promise<any>}
   */
  async validate(payload: any): Promise<any> {
    if (payload && payload.sub) {
      const user = await this.userService.findOne(payload.sub);

      // Check if active
      if (user && !user.active) {
        throw new UnauthorizedException(
          'This user account is still pending verification. Please wait or contact administrator',
        );
      }

      // Check if suspended
      if (
        user &&
        user.suspendedAt &&
        user.suspendedAt.getTime() <= new Date().getTime()
      ) {
        throw new UnauthorizedException(
          'This user account has been suspended or rejected. Please contact administrator',
        );
      }

      return user;
    }

    throw new UnauthorizedException();
  }
}
