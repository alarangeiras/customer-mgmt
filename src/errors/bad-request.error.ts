import { ApiError } from './api.error';

export class BadRequest extends ApiError {
  constructor(message = 'Bad Request', details = null) {
    super(400, message, details);
  }
}
