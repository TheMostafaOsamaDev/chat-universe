import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetChatDto {
  @IsNotEmpty({ message: 'userId is required' })
  @IsString({ message: 'userId must be a string' })
  @ApiProperty({
    type: String,
    description: 'userId of the user to get chat with',
    required: true,
    example: '649a847934234567890abc',
  })
  userId: string;

  @IsNotEmpty({ message: 'userChattingWithId is required' })
  @IsString({ message: 'userChattingWithId must be a string' })
  @ApiProperty({
    type: String,
    description: 'userId of the user chatting with',
    required: true,
    example: '649a847934234567890def',
  })
  userChattingWithId: string;
}
