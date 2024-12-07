import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { comparePassword, User } from './user.model';
import { Model } from 'mongoose';
import { LogInUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('User') private userModel: Model<User>) {}

  async register(createUserDto: CreateUserDto) {
    const foundUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (foundUser) {
      throw new BadRequestException('User already exists');
    }

    const user = new this.userModel({
      ...createUserDto,
      username: createUserDto.name,
    });
    return user.save();
  }

  async logIn(logInUserDto: LogInUserDto) {
    const user = await this.userModel.findOne({
      email: logInUserDto.email,
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = await comparePassword(logInUserDto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Wrong password');
    }

    return {
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
      },
    };
  }
}
