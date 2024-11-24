import {
  Controller,
  // Get,
  // Inject
} from '@nestjs/common';
// import { User } from './auth/user.model';
// import { Model } from 'mongoose';
// import { users_seeder } from './seeders/users.seeder';

@Controller()
export class AppController {
  // constructor(@Inject('User') private userModel: Model<User>) {}
  // @Get('/users-seeder')
  // async getHello() {
  //   await this.userModel.insertMany(users_seeder);
  //   return 'Users seeder has been executed successfully!';
  // }
}
