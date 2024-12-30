import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { comparePassword, User } from './user.model';
import { Model } from 'mongoose';
import { LogInUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { extname, join } from 'path';
import { unlinkSync, writeFile } from 'fs';
import sharp from 'sharp';
import { UpdateUserDto } from './dto/update-user.dto';

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

    const newName = `${user._id}_${Date.now()}.webp`;

    const outputPath = join(
      __dirname,
      '..',
      '..',
      'client',
      'avatars',
      newName,
    );

    await sharp(file.path).resize(800).webp({ quality: 80 }).toFile(outputPath);

    // Delete the old avatar
    if (user.avatar && !user.avatar.includes('default_avatar.png')) {
      unlinkSync(join(__dirname, '..', '..', 'client', user.avatar));
    }

    user.avatar = `/avatars/${newName}`;

    await user.save();

    user.password = null;

    return user.toJSON();
  }

  // Update user
  async updateUser(updateUserDto: UpdateUserDto, userId: string) {
    const user = await this.userModel
      .findOne({ _id: userId, username: updateUserDto.oldUsername })
      .select('name username');

    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.name = updateUserDto.name || user.name;
    user.username = updateUserDto.username || user.username;

    await user.save();

    return user.toJSON();
  }
}
