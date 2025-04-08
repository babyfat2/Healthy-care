import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { jwtConstants } from 'src/configs/auth.config';
import { TPayloadJwt } from 'src/modules/auth/auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Bearer token
      ignoreExpiration: false, // Automatically check JWT expiration
      secretOrKey: jwtConstants.secret, // Secret key for verifying the JWT
    });
  }

  /**
   *
   * Validate the JWT payload and check if the user exists.
   * @param payload The JWT payload (typically containing the user ID)
   * @returns The user object or throws UnauthorizedException if validation fails.
   */
  async validate(payload: TPayloadJwt) {
    try {
      // Retrieve the user based on the ID from the JWT payload
      const user = await this.userService.getUserById(payload.id);

      // If the user does not exist, return null which will cause an unauthorized error
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      // If any error occurs during validation, throw UnauthorizedException
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
