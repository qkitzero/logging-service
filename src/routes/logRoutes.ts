import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
// import createClient from 'openapi-fetch';
import { LogUseCaseImpl } from '../application/logUseCase';
// import { paths } from '../infrastructure/api/auth.schema';
// import { AuthUseCaseImpl } from '../infrastructure/api/authUseCase';
import { LogRepositoryImpl } from '../infrastructure/logRepository';
import { LogController } from '../interface/logController';
import { CreateLogRequestSchema } from '../interface/logSchema';
// import { AuthMiddleware } from '../interface/middleware/auth';
import { ValidateMiddleware } from '../interface/middleware/validate';

const router = Router();

// const authClientProtocol = process.env.ENV === 'production' ? 'https' : 'http';
// const authClientHost = process.env.AUTH_SERVICE_HOST;
// const authClientPort = process.env.AUTH_SERVICE_PORT;
// const authClientBaseUrl = `${authClientProtocol}://${authClientHost}:${authClientPort}`;
// const authClient = createClient<paths>({ baseUrl: authClientBaseUrl });

const prisma = new PrismaClient();
const logRepository = new LogRepositoryImpl(prisma);

// const authUseCase = new AuthUseCaseImpl(authClient);
const logUseCase = new LogUseCaseImpl(logRepository);

// const authMiddleware = new AuthMiddleware(authUseCase);
const validateMiddleware = new ValidateMiddleware();

const logController = new LogController(logUseCase);

router.post(
  '/',
  // authMiddleware.verifyToken,
  validateMiddleware.handle(CreateLogRequestSchema),
  logController.createLog,
);
router.get(
  '/',
  // authMiddleware.verifyToken,
  logController.getAllLogs,
);

export default router;
