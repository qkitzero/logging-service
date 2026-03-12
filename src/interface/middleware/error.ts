import { NextFunction, Request, Response } from 'express';
import { ApplicationError, AuthError } from '../../application/errors';
import { InvalidIdError } from '../../domain/log/id';
import { InvalidLevelError } from '../../domain/log/level';
import { InvalidMessageError } from '../../domain/log/message';
import { InvalidServiceNameError } from '../../domain/log/serviceName';
import { InvalidUserIdError } from '../../domain/log/userId';

export class ErrorMiddleware {
  private static readonly STATUS_MAP: ReadonlyArray<[new (...args: never[]) => Error, number]> = [
    [InvalidIdError, 400],
    [InvalidLevelError, 400],
    [InvalidMessageError, 400],
    [InvalidServiceNameError, 400],
    [InvalidUserIdError, 400],
    [AuthError, 401],
  ];

  static notFoundHandler = (_req: Request, res: Response) => {
    res
      .status(404)
      .json({ error: 'NotFoundError', message: 'The requested resource was not found' });
  };

  static errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    const statusCode = ErrorMiddleware.resolveStatusCode(err);
    const errorName =
      err instanceof ApplicationError ? err.name : err.name || 'InternalServerError';
    res.status(statusCode).json({ error: errorName, message: err.message });
  };

  private static resolveStatusCode(err: Error): number {
    for (const [ErrorClass, code] of ErrorMiddleware.STATUS_MAP) {
      if (err instanceof ErrorClass) return code;
    }
    return 500;
  }
}
