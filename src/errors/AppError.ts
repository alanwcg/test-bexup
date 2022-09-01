export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly name: string,
  ) {
    super(name)
  }
}