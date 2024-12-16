import { NextFunction, Response } from 'express';
import { IUserJwt } from '../typings/interfaces/userJwt';
import { jwtDecrypt, PUBLIC_ROUTES } from '../utils';

const protect = (req: IUserJwt, res: Response, next: NextFunction) => {
  if (
    PUBLIC_ROUTES.find((string) => {
      if (req.url.includes(string)) {
        return true;
      }
      return string === req.url;
    })
  ) {
    return next();
  }
  const token = req.headers.authorization;

  if (!token) {
    const e = new Error('MISSING_ACCESS_TOKEN');
    return next(e);
  }

  try {
    const header = req.header('Authorization');
    if (header) {
      const result = jwtDecrypt(header);
      if (result?.id) {
        req.id = result?.id;
        req.refresh_token = req.header('RefreshToken') ?? '';
        req.access_token = header;
      }
      return next();
    }
  } catch (error) {
    const e = new Error('INVALID_ACCESS_TOKEN');
    return next(e);
  }
  const e = new Error('INVALID_ACCESS_TOKEN');
  return next(e);
};

export default protect;
