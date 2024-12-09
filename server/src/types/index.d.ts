import { User } from 'src/auth/user.model';

declare global {
  namespace Express {
    interface User extends User {
      id: string;
      _id: string;
    }
  }
}
