import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Full name is required' })
  @ApiProperty({
    example: 'Folan Ibn Folan',
    type: String,
    description: 'The full name of the user',
  })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  @ApiProperty({
    example: 'folan@example.com',
    type: String,
    description: 'The email of the user',
  })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword({}, { message: 'Password is too weak' })
  @ApiProperty({
    example: 'fdf@#45ssdSDD34',
    type: String,
    description: 'The password of the user',
  })
  password: string;
}
