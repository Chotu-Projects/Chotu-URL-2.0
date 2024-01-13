import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE } from '../config';
import { IPayload } from '../interfaces/jwt.interface';
import { NextFunction } from 'express';

export const createJwtToken = (payload: IPayload) => {
  const token: string = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE
  });

  return token;
};

export const verifyJwtToken = (token: string, next: NextFunction) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as IPayload;
    const { userId } = payload;

    return userId;
  } catch (err) {
    next(err);
  }
};
