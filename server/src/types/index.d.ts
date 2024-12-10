import { User } from 'src/auth/user.model';

declare global {
  namespace Express {
    interface User extends User {
      _id: string;
      email: string;
      username: string;
      name: string;
      avatar: string;
    }
  }
}
