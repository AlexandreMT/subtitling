export function errorHandler(message: string, error: unknown) {
  if (error instanceof Error) return new Error(`${message} - Cause: ${error.message}`);
  return new Error(`${message} - Cause: ${error}`);
}
