export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details: any = null,
  ) {
    super(message);
  }
}
