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
import { SessionService } from 'src/sessions/session.service';
import { User } from './user.model';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async logIn(@Req() req: Request, @Res() res: Response) {
    const session = await this.sessionService.createSession(req.user as User);

    res.cookie('Authorization', `Bearer ${session}`, {
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
