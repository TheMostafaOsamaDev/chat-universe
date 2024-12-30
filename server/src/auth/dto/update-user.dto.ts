import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PickType(CreateUserDto, ['name']) {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(6, { message: 'Username must be at least 6 characters long' })
  @MaxLength(23, { message: 'Username cannot exceed 22 characters' })
  username: string;

  @IsNotEmpty({ message: 'Old username is required' })
  @IsString({ message: 'Old username must be a string' })
  oldUsername: string;
}
