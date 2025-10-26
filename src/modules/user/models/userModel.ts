import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/iUser';

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
});

export const UserModel = model<IUser>('User', userSchema);
