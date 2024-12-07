import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { LogInUserDto } from './dto/login-user.dto';
import { LocalGuard } from 'src/guards/local.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() logInUserDto: LogInUserDto, @Res() res: Response) {
    const { user, session } = await this.authService.logIn(logInUserDto);

    res.cookie('Authorization', `Bearer ${session}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.json({ user });
  }

  // @Delete('logout')
  // async logout(@Req() req: Request, @Res() res: Response) {

  //   req.session.destroy((err) => {
  //     if (err) {
  //       return res.status(500).send({ message: 'Error destroying session' });
  //     }
  //     res.clearCookie('connect.sid'); // Clear the session cookie
  //     return res.send({ message: 'User logged out' });
  //   });
  // }
}
