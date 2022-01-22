import { ApiError } from './api.error';

export class NotFoundError extends ApiError {
  constructor(message = 'Bad Request') {
    super(404, message);
  }
}
