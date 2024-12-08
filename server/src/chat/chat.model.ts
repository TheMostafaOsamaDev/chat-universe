import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Chat {
  @Prop({ required: true, ref: 'Conversation' })
  conversation: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, ref: 'User' })
  sender: string;

  @Prop({ required: true, ref: 'User' })
  receiver: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
