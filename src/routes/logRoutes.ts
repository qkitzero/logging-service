import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { LogUseCaseImpl } from '../application/logUseCase';
import { LogRepositoryImpl } from '../infrastructure/logRepository';
import { LogController } from '../interface/logController';

const router = Router();

const prisma = new PrismaClient();
const logRepository = new LogRepositoryImpl(prisma);
const logUseCase = new LogUseCaseImpl(logRepository);
const logController = new LogController(logUseCase);

router.post('/', (req, res) => logController.createLog(req, res));
router.get('/', (req, res) => logController.getAllLogs(req, res));

export default router;
