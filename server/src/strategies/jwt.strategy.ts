import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LogInUserDto } from 'src/auth/dto/login-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromHeader('authorization'),
        (request) => {
          return (
            request?.cookies?.authorization || request?.cookies?.Authorization
          );
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: LogInUserDto) {
    return payload;
  }
}
