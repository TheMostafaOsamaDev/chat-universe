import { User } from 'src/auth/user.model';

declare global {
  namespace Express {
    interface User extends User {}
  }
}
