import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  msId?: string;
  refreshToken?: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    msId: { type: String, unique: true },
    refreshToken: { type: String },
  },
  { timestamps: true },
);

export const UserModel = model<IUser>('User', UserSchema);
