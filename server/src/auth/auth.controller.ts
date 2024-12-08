import {
  Body,
  Controller,
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
import { LocalGuard } from 'src/guards/local.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async logIn(@Req() req: Request, @Res() res: Response) {
    const token = this.jwtService.sign(req.user);

    res.cookie('Authorization', `${token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.send({ user: req.user });
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  getStatus() {
    return { status: 'ok' };
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
