import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/auth/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private jwtService: JwtService,
  ) {}

  async createSession(user: User) {
    const payload = {
      email: user.email,
      name: user.name,
      username: user.username,
      // @ts-ignore
      id: user._id,
    };

    const token = this.jwtService.sign(payload);

    const hashedToken = await bcrypt.hash(token, 10);

    // Continue storing the hashed token in the cache

    console.log(token);
  }
}
