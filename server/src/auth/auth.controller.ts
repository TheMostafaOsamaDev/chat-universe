import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { LocalGuard } from 'src/guards/local.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async logIn(@Req() req: Request, @Res() res: Response) {
    const { token, userDoc } = this.authService.signToken(req.user);

    res.cookie('Authorization', `${token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.send({ user: userDoc });
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async refresh(@Req() req: Request) {
    return {
      user: req.user,
    };
  }
}
