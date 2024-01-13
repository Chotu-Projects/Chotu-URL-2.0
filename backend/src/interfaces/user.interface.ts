import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAccountVerified: boolean;
}

export interface IAuthToken {
  token: string;
  generatedAt?: number;
  attempts?: number;
  user: IUser;
}
