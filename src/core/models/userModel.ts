import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  msId?: string;
  idToken: string;
  msAccessToken?: string;
  msRefreshToken?: string;
  accessToken: String;
  refreshToken: String;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    msId: { type: String, unique: true },
    msAccessToken: { type: String },
    msRefreshToken: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true },
);

export const UserModel = model<IUser>('User', UserSchema);
