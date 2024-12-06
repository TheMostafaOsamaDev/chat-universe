import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/auth/user.model';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { SessionDecoded } from 'src/types/session';

@Injectable()
export class SessionService {
  constructor(private jwtService: JwtService) {}

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

    return sessionToken;
  }
}
