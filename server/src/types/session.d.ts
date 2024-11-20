// src/types/session.d.ts

import 'express-session';
import { User } from 'src/auth/user.model';

declare module 'express-session' {
  interface SessionData {
    user?: User; // You can specify the exact type of your user model here.
  }
}

type SessionDecoded = {
  email: string;
  name: string;
  username: string;
  id: string;
  sessionId: string;
  iat: number;
  exp: number;
};
