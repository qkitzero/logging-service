import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { LogUseCase } from '../application/logUseCase';
import { PrismaLogRepository } from '../infrastructure/logRepository';
import { LogController } from '../interface/logController';

const router = Router();

const prisma = new PrismaClient();
const logRepository = new PrismaLogRepository(prisma);
const logUseCase = new LogUseCase(logRepository);
const logController = new LogController(logUseCase);

router.post('/', (req, res) => logController.createLog(req, res));
router.get('/', (req, res) => logController.getAllLogs(req, res));

export default router;
