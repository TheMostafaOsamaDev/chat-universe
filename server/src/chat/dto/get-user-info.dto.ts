import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export class GetUserInfoDto extends PickType(CreateUserDto, ['name']) {
  @IsNotEmpty({ message: 'username is required' })
  @ApiProperty({
    description: 'Username of the user',
    example: 'themostafaosama',
  })
  username: string;

  @IsNotEmpty({ message: 'Online status is required' })
  @ApiProperty({
    description: 'Online status of the user',
    example: true,
  })
  isOnline: boolean;
}
