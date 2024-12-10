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
import { User } from './user.model';

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
  async logIn(@Req() req: Request, @Res() res: Response) {
    const { token, userDoc } = this.authService.signToken(req.user);

    res.cookie('Authorization', `${token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.send({ user: userDoc });
  }

  @Post('refresh')
  async refresh(@Body() body: { user: User }, @Res() res: Response) {
    const { token, userDoc } = this.authService.signToken(body.user);

    res.cookie('Authorization', `${token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.send({ user: userDoc });
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
