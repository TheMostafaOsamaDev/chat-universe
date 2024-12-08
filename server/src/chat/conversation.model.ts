import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ required: true, ref: 'User' })
  user1: string;

  @Prop({ required: true, ref: 'User' })
  user2: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ type: String })
  lastMessage: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
