import { Mongoose } from 'mongoose';
import { ChatSchema } from './chat.model';

export const chatProviders = [
  {
    provide: 'Chat',
    useFactory: (mongoose: Mongoose) => mongoose.model('Chat', ChatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
