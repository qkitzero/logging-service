import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import createClient from 'openapi-fetch';
import { LogUseCaseImpl } from '../application/logUseCase';
import { paths } from '../infrastructure/api/auth.schema';
import { AuthUseCaseImpl } from '../infrastructure/api/authUseCase';
import { LogRepositoryImpl } from '../infrastructure/logRepository';
import { LogController } from '../interface/logController';

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

const logController = new LogController(authUseCase, logUseCase);

router.post('/', (req, res) => logController.createLog(req, res));
router.get('/', (req, res) => logController.getAllLogs(req, res));

export default router;
