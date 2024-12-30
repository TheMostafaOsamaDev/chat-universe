import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { LocalGuard } from 'src/guards/local.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorageConfig } from 'src/config/upload-avatar.config';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const userDoc = await this.authService.register(createUserDto);
    userDoc.password = undefined;

    const { token } = this.authService.signToken(userDoc);

    res.cookie('Authorization', `${token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.send(userDoc);
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

  // TODO: Add intereceptor to handle file size
  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file', diskStorageConfig))
  @UseGuards(JwtAuthGuard)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const updatedUser = await this.authService.saveAvatar(file, req.user._id);

    return updatedUser;
  }

  @Put('update-profile')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const updatedUser = await this.authService.updateUser(
      updateUserDto,
      req.user._id,
    );

    return updatedUser;
  }
}
