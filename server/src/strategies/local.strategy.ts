import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    console.log('Inside Local Strategy');
    const { user } = await this.authService.logIn({ email, password });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }
}
