import { Controller, Get, Inject } from '@nestjs/common';
import { User } from './auth/user.model';
import { Model } from 'mongoose';

@Controller()
export class AppController {
  constructor(@Inject('User') private userModel: Model<User>) {}
  @Get('/change-password')
  async changePassword() {
    const users = await this.userModel.findOne({
      email: 'mostafa.osama@gmail.com',
    });

    users.password = 'Mostafa@1952002';

    await users.save();

    return 'Password has been changed successfully!';
  }
}
