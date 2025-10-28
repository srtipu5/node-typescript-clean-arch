import { Schema, model, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

export type IUser = InferSchemaType<typeof userSchema>;

export const UserModel = model<IUser>('User', userSchema);
