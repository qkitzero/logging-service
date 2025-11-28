import { NextFunction, Request, Response } from 'express';
import { AuthUseCase } from '../../application/authUseCase';
import { AuthError } from '../../infrastructure/api/authUseCase';

export class AuthMiddleware {
  constructor(private readonly authUseCase: AuthUseCase) {}

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({
        error: AuthError.name,
        message: 'Token is missing',
      });
    }

    const [scheme, token] = header.split(' ');
    if (scheme.toLowerCase() !== 'bearer' || !token) {
      return res.status(401).json({
        error: AuthError.name,
        message: 'Invalid Authorization format',
      });
    }

    try {
      await this.authUseCase.verifyToken(token);
      next();
    } catch (error) {
      if (error instanceof AuthError) {
        return res.status(401).json({
          error: error.name,
          message: error.message,
        });
      }

      return res.status(500).json({
        error: 'InternalServerError',
        message: 'Unexpected server error',
      });
    }
  }
}
