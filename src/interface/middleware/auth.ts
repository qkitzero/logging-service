import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../application/authService';

declare module 'express' {
  interface Request {
    userId?: string;
  }
}

export class AuthMiddleware {
  constructor(private readonly authService: AuthService) {}

  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({
        error: 'AuthError',
        message: 'Token is missing',
      });
    }

    const [scheme, token] = header.split(' ');
    if (scheme.toLowerCase() !== 'bearer' || !token) {
      return res.status(401).json({
        error: 'AuthError',
        message: 'Invalid Authorization format',
      });
    }

    try {
      const userId = await this.authService.verifyToken(token);
      req.userId = userId;
      next();
    } catch (error) {
      return res.status(401).json({
        error: 'AuthError',
        message: error instanceof Error ? error.message : 'Failed to verify token',
      });
    }
  };
}
