import { Mongoose } from 'mongoose';
import { ChatSchema } from './chat.model';
import { ConversationSchema } from './conversation.model';

export const chatProviders = [
  {
    provide: 'Chat',
    useFactory: (mongoose: Mongoose) => mongoose.model('Chat', ChatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'Conversation',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Conversation', ConversationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
