import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export class ValidateMiddleware {
  handle = (schema: z.ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        });
      }
      next(error);
    }
  };
}
