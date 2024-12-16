import jwt from 'jsonwebtoken';
import { IToken } from '../typings/interfaces';
import { IUserJwt } from '../typings/interfaces/userJwt';

export const generateTokens = async (payload: any, needToken = true, needRefreshToken = true) => {
  if (needToken === false && needRefreshToken === false) {
    throw new Error('No tokens generated');
  }
  const { password, ...rest } = payload;
  const tokens: IToken = {};
  if (needToken && process.env.JWT_ACCESS_TOKEN) {
    tokens['token'] = jwt.sign(rest, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: process.env.JWT_ACCESS_TIME,
    });
  }
  if (needRefreshToken && process.env.JWT_ACCESS_TOKEN) {
    tokens['refreshToken'] = jwt.sign(rest, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: process.env.JWT_REFRESH_TIME,
    });
  }
  return tokens;
};

export const jwtDecrypt = (token: string) => {
  const toDecode = token?.replace('Bearer ', '');
  return jwt.decode(toDecode) as IUserJwt;
};
