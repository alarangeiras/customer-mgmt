export class ApiError extends Error {
  constructor(private _statusCode: number, message: string) {
    super(message);
  }

  get statusCode(): number {
    return this._statusCode;
  }
}
