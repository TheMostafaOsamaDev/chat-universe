import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { comparePassword, User } from './user.model';
import { Model } from 'mongoose';
import { LogInUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { extname, join } from 'path';
import { unlinkSync, writeFile } from 'fs';
import sharp from 'sharp';

@Injectable()
export class AuthService {
  constructor(
    @Inject('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

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

  signToken(user: User | Express.User) {
    const userDoc = {
      _id: user._id,
      email: user.email,
      username: user.username,
      name: user.name,
      avatar: user.avatar,
    };

    const token = this.jwtService.sign(userDoc);

    return {
      token,
      userDoc,
    };
  }

  // Get file and save it
  async saveAvatar(file: Express.Multer.File, userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const outputPath = join(
      __dirname,
      '..',
      '..',
      'client',
      'avatars',
      // Change file ext
      `${user._id}.webp`,
    );

    await sharp(file.path).resize(200).webp({ quality: 80 }).toFile(outputPath);

    user.avatar = `/avatars/${user._id}.webp`;

    await user.save();

    user.password = null;

    return user.toJSON();
  }
}
