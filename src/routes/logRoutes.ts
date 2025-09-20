import { Router } from "express";
import { LogController } from "../interface/logController";
import { LogRepository } from "../infrastructure/logRepository";
import { LogUseCase } from "../application/logUseCase";

const router = Router();

const logRepository = new LogRepository();
const logUseCase = new LogUseCase(logRepository);
const logController = new LogController(logUseCase);

router.post("/", (req, res) => logController.createLog(req, res));

export default router;
