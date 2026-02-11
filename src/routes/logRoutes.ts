import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import createClient from 'openapi-fetch';
import { LogUseCaseImpl } from '../application/logUseCase';
import { AuthServiceImpl } from '../infrastructure/api/auth/authService';
import { paths as authPaths } from '../infrastructure/api/auth/schema';
import { LogRepositoryImpl } from '../infrastructure/logRepository';
import { LogController } from '../interface/logController';
import { CreateLogRequestSchema } from '../interface/logSchema';
import { AuthMiddleware } from '../interface/middleware/auth';
import { ValidateMiddleware } from '../interface/middleware/validate';

const router = Router();

const authClientProtocol = process.env.ENV === 'production' ? 'https' : 'http';
const authClientHost = process.env.AUTH_SERVICE_HOST;
const authClientPort = process.env.AUTH_SERVICE_PORT;
const authClientBaseUrl = `${authClientProtocol}://${authClientHost}:${authClientPort}`;
const authClient = createClient<authPaths>({ baseUrl: authClientBaseUrl });

const prisma = new PrismaClient();
const logRepository = new LogRepositoryImpl(prisma);

const authService = new AuthServiceImpl(authClient);
const logUseCase = new LogUseCaseImpl(logRepository);

const authMiddleware = new AuthMiddleware(authService);
const validateMiddleware = new ValidateMiddleware();

const logController = new LogController(logUseCase);

router.post(
  '/',
  authMiddleware.verifyToken,
  validateMiddleware.handle(CreateLogRequestSchema),
  logController.createLog,
);
router.get('/', authMiddleware.verifyToken, logController.getAllLogs);

export default router;
