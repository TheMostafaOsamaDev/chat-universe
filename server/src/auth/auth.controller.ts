import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { LogInUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body() logInUserDto: LogInUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.logIn(logInUserDto, req, res);
  }

  @Post('get-session')
  async getSession(@Req() req: Request) {
    return this.authService.getSession(req.body?.session);
  }

  @Delete('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({ message: 'Error destroying session' });
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      return res.send({ message: 'User logged out' });
    });
  }
}
