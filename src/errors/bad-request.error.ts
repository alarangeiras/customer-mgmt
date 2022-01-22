import { ApiError } from './api.error';

export class BadRequest extends ApiError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}
