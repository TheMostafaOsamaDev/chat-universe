import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({ required: true, minlength: 3, maxlength: 50 })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true, minlength: 6, maxlength: 22 })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '/avatars/default_avatar.png' })
  avatar: string;

  @Prop({ default: false })
  isOnline: boolean;

  @Prop({ default: '' })
  clientSocketId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this as any;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.pre('save', function (next) {
  const user = this as any;

  // Check if the document is new and if the username has not been modified
  if (this.isNew) {
    user.username =
      `${user.username.toLowerCase()}_${uuidv4().slice(0, 8)}`.replace(
        / /g,
        '_',
      );
  }

  next();
});
// Compare password
export const comparePassword = async function (
  enteredPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
