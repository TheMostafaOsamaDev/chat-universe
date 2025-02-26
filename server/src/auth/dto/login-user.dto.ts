import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class LogInUserDto extends PickType(CreateUserDto, [
  'email',
  'password' as const,
]) {}
