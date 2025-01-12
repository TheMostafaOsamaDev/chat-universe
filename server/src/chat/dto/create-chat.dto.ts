import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  userChattingWithId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  media: string[];
}
