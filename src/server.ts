import { PrismaClient } from '@prisma/client';
import express from 'express';
import createClient from 'openapi-fetch';
import { LogUseCaseImpl } from './application/logUseCase';
import { AuthServiceImpl } from './infrastructure/api/auth/authService';
import { paths as authPaths } from './infrastructure/api/auth/schema';
import { LogRepositoryImpl } from './infrastructure/logRepository';
import { LogController } from './interface/logController';
import { createLogRoutes } from './interface/logRoutes';
import { AuthMiddleware } from './interface/middleware/auth';
import { ErrorMiddleware } from './interface/middleware/error';
import { ValidateMiddleware } from './interface/middleware/validate';

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

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/v1/logs', createLogRoutes(authMiddleware, validateMiddleware, logController));

app.use(ErrorMiddleware.notFoundHandler);
app.use(ErrorMiddleware.errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
