import { Mongoose } from 'mongoose';
import { UserSchema } from './user.model';

export const authProviders = [
  {
    provide: 'User',
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
