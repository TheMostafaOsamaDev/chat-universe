import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
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

  if (!user.isModified('username')) return next();

  user.username = `${user.username}`.toLowerCase();
  next();
});

// Compare password
export const comparePassword = async function (
  enteredPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
