import { Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.model';
import { Chat } from './chat.model';
import { GetChatDto } from './dto/get-chat.dto';
import { Conversation } from './conversation.model';

@Injectable()
export class ChatService {
  constructor(
    @Inject('User') private userModel: Model<User>,
    @Inject('Chat') private chatModel: Model<Chat>,
    @Inject('Conversation') private conversationModel: Model<Conversation>,
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

  async getAllChats(userId: string) {
    const conversations = await this.conversationModel
      .find({
        $or: [{ user1: userId }, { user2: userId }],
      })
      .populate('user1 user2')
      .select('-password -email -avatar -email -createdAt -updatedAt')
      .limit(10);

    return conversations;
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

    const participants = [userId, userChattingWithId].sort();

    let conversation = await this.conversationModel.findOne({
      user1: participants[0],
      user2: participants[1],
    });

    if (!conversation) {
      conversation = await this.conversationModel.create({
        user1: participants[0],
        user2: participants[1],
        lastMessage: message,
      });
    } else {
      conversation.lastMessage = message;
      await conversation.save();
    }

    const chat = new this.chatModel({
      message,
      sender: userId,
      receiver: userChattingWithId,
      conversation: conversation._id,
    });

    await chat.save();

    return {
      chat: chat.toJSON(),
      conversation: conversation.toJSON(),
    };
  }
}
