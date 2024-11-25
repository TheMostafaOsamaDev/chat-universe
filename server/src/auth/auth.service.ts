import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { comparePassword, User } from './user.model';
import { Model } from 'mongoose';
import { LogInUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { SessionService } from 'src/sessions/session.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('User') private userModel: Model<User>,
    private readonly sessionService: SessionService,
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

  async logIn(logInUserDto: LogInUserDto, req: Request, res: Response) {
    const user = await this.userModel.findOne({
      email: logInUserDto.email,
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = await comparePassword(logInUserDto.password, user.password);

    console.log(isMatch);

    if (!isMatch) {
      throw new BadRequestException('Wrong password');
    }

    return res.json({
      user: {
        ...user.toJSON(),
        password: undefined,
      },
      // session,
    });
  }

  async getSession(session?: string) {
    return await this.sessionService.validateSession(session);
  }
}
