import { Router } from "express";
import { LogController } from "../interface/logController";

const router = Router();

const logController = new LogController();

router.get("/", (req, res) => logController.getLogs(req, res));

export default router;
