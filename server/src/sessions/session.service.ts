import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/auth/user.model';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { SESSION_CACHE_TTL } from 'src/constants';
import { SessionDecoded } from 'src/types/session';

@Injectable()
export class SessionService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private jwtService: JwtService,
  ) {}

  async createSession(user: User) {
    const sessionId = uuidv4();

    const payload = {
      email: user.email,
      name: user.name,
      username: user.username,
      // @ts-ignore
      id: user._id,
      sessionId,
    };

    const sessionToken = this.jwtService.sign(payload);

    const hashedSessionToken = await bcrypt.hash(sessionToken, 10);

    // Continue storing the hashed token in the cache
    await this.cacheManager.set(
      sessionId,
      hashedSessionToken,
      SESSION_CACHE_TTL,
    );

    return sessionToken;
  }

  async validateSession(session?: string) {
    if (!session) {
      return false;
    }

    const sessionDecoded: SessionDecoded = this.jwtService.decode(session);

    const hashedSessionToken = await this.cacheManager.get(
      sessionDecoded.sessionId,
    );

    // df7766ab-46cf-4e4c-9fca-f5ae1e38e449
    console.log(sessionDecoded.sessionId);
    console.log('hashedSessionToken', hashedSessionToken);
    if (!hashedSessionToken) {
      return false;
    }
  }
}
