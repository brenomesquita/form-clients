import { BaseException } from './base.exception';

export class UnprocessableContentException extends BaseException {
  constructor(message: string) {
    super(message, 422);
  }
}
