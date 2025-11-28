import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import createClient from 'openapi-fetch';
import { LogUseCaseImpl } from '../application/logUseCase';
import { paths } from '../infrastructure/api/auth.schema';
import { AuthUseCaseImpl } from '../infrastructure/api/authUseCase';
import { LogRepositoryImpl } from '../infrastructure/logRepository';
import { LogController } from '../interface/logController';
import { CreateLogRequestSchema, GetAllLogsRequestSchema } from '../interface/logSchema';
import { AuthMiddleware } from '../interface/middleware/auth';
import { validate } from '../interface/middleware/validate';

const router = Router();

const authClientProtocol = process.env.ENV === 'production' ? 'https' : 'http';
const authClientHost = process.env.AUTH_SERVICE_HOST;
const authClientPort = process.env.AUTH_SERVICE_PORT;
const authClientBaseUrl = `${authClientProtocol}://${authClientHost}:${authClientPort}`;
const authClient = createClient<paths>({ baseUrl: authClientBaseUrl });

const prisma = new PrismaClient();
const logRepository = new LogRepositoryImpl(prisma);

const authUseCase = new AuthUseCaseImpl(authClient);
const logUseCase = new LogUseCaseImpl(logRepository);

const authMiddleware = new AuthMiddleware(authUseCase);

const logController = new LogController(logUseCase);

router.post(
  '/',
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  validate(CreateLogRequestSchema),
  (req, res) => logController.createLog(req, res),
);
router.get(
  '/',
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  validate(GetAllLogsRequestSchema),
  (req, res) => logController.getAllLogs(req, res),
);

export default router;
