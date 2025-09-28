import { Router } from "express";
import { LogController } from "../interface/logController";
import { LogRepository } from "../infrastructure/logRepository";
import { LogUseCase } from "../application/logUseCase";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prisma = new PrismaClient();
const logRepository = new LogRepository(prisma);
const logUseCase = new LogUseCase(logRepository);
const logController = new LogController(logUseCase);

router.post("/", (req, res) => logController.createLog(req, res));

export default router;
