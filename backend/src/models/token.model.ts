import { model, Schema } from 'mongoose';
import { IAuthToken } from '../interfaces/user.interface';

const authTokenSchema: Schema<IAuthToken> = new Schema({
  token: { type: String, required: true },
  generatedAt: { type: Number, default: Date.now() },
  attempts: { type: Number, default: 0 },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const AuthToken = model<IAuthToken>('AuthToken', authTokenSchema);
export default AuthToken;
