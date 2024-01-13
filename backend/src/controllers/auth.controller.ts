import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { authToken } from '../utils/authtoken.util';
import AuthToken from '../models/token.model';
import { createJwtToken } from '../utils/jwt.util';
import { IPayload } from '../interfaces/jwt.interface';
import { LOGIN_FAILED } from '../errors';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    // create a new user
    const createUser = new User({ name, email, password });
    const newUser = await createUser.save();

    const jwtPayload: IPayload = { userId: newUser._id };
    const jwtToken = createJwtToken(jwtPayload);

    res.status(201).json({
      type: 'success',
      message: 'New account has been created and verification link sent',
      data: {
        token: jwtToken
      }
    });

    // generate the auth token and send it via mail
    const token = authToken();
    const createAuthToken = new AuthToken({ token, user: newUser._id });
    const newAuthToken = await createAuthToken.save();

    // TODO: Send the token to user's email
    console.log(newAuthToken); // remove this

    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      const jwtPayload: IPayload = { userId: user._id };
      const jwtToken = createJwtToken(jwtPayload);

      res.status(200).json({
        type: 'success',
        message: 'Login success',
        data: {
          token: jwtToken
        }
      });
    } else {
      next({ status: 401, message: LOGIN_FAILED });
      return;
    }
  } catch (err) {
    next(err);
  }
};
