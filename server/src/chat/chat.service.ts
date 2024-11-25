import { Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.model';

@Injectable()
export class ChatService {
  constructor(@Inject('User') private userModel: Model<User>) {}

  changeUserStatus(userId: string, isOnline: boolean, socketid?: string) {
    if (isOnline) return this.userModel.findByIdAndUpdate(userId, { isOnline });

    if (socketid) {
      return this.userModel.findOneAndUpdate(
        {
          clientSocketId: socketid,
        },
        { isOnline },
      );
    }
  }

  searchUsers(value: string) {
    const emailRegex = new RegExp(`^[^@]*${value}`, 'i');

    return this.userModel
      .find({
        $or: [
          { name: { $regex: value, $options: 'i' } },
          { email: { $regex: emailRegex } },
          { username: { $regex: value, $options: 'i' } },
        ],
      })
      .select('-password')
      .limit(8);
  }
}
