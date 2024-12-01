import { Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.model';
import { Chat } from './chat.model';
import { GetChatDto } from './dto/get-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @Inject('User') private userModel: Model<User>,
    @Inject('Chat') private chatModel: Model<Chat>,
  ) {}

  changeUserStatus(userId: string, isOnline: boolean, socketid: string) {
    if (isOnline)
      return this.userModel.findByIdAndUpdate(userId, {
        isOnline,
        clientSocketId: socketid,
      });

    if (!isOnline) {
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

  async getUser(id: string) {
    const user = await this.userModel
      .findById(id)
      .select('-password -email -avatar -email -createdAt -updatedAt');

    return user;
  }

  async getChat({ userId, userChattingWithId }: GetChatDto) {
    const chat = await this.chatModel.find({
      $or: [
        { sender: userId, receiver: userChattingWithId },
        { sender: userChattingWithId, receiver: userId },
      ],
    });

    return chat;
  }

  async createMessage({ message, userId, userChattingWithId }: CreateChatDto) {
    const usersCount = await this.userModel.countDocuments({
      _id: { $in: [userId, userChattingWithId] },
    });

    if (usersCount !== 2) {
      throw new Error('Invalid user');
    }
  }
}
