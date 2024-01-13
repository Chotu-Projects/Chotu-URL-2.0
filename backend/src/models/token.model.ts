import { model, Schema } from 'mongoose';
import { IAuthToken } from '../interfaces/user.interface';

const authTokenSchema: Schema<IAuthToken> = new Schema(
  {
    token: { type: String },
    generatedAt: { type: Number, default: Date.now() },
    attempts: { type: Number, default: 0 }
  },
  { _id: false }
);

const AuthToken = model<IAuthToken>('AuthToken', authTokenSchema);
export default AuthToken;
