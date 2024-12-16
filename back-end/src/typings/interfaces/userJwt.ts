import { Request } from 'express';

export interface IUserJwt extends Request {
  id: string;
  refresh_token: string;
  access_token: string;
}
