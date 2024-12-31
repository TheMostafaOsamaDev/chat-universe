import { User } from 'src/auth/user.model';

declare module 'socket.io' {
  interface Socket {
    user: User;
  }
}
