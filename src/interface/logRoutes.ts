import { Router } from 'express';
import { LogController } from './logController';
import { CreateLogRequestSchema } from './logSchema';
import { AuthMiddleware } from './middleware/auth';
import { ValidateMiddleware } from './middleware/validate';

export const createLogRoutes = (
  authMiddleware: AuthMiddleware,
  validateMiddleware: ValidateMiddleware,
  logController: LogController,
): Router => {
  const router = Router();

  router.post(
    '/',
    authMiddleware.verifyToken,
    validateMiddleware.handle(CreateLogRequestSchema),
    logController.createLog,
  );
  router.get('/', authMiddleware.verifyToken, logController.getAllLogs);

  return router;
};
