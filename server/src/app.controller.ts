import { Controller, Get, Inject } from '@nestjs/common';
import { User } from './auth/user.model';
import { Model } from 'mongoose';
// import { users_seeder } from './seeders/users.seeder';
import * as bcrypt from 'bcryptjs';

@Controller()
export class AppController {
  constructor(@Inject('User') private userModel: Model<User>) {}
  // @Get('/users-seeder')
  // async getHello() {
  //   await this.userModel.insertMany(users_seeder);
  //   return 'Users seeder has been executed successfully!';
  // }

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
