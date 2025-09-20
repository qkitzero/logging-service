import { Request, Response } from "express";
import { LogUseCase } from "../application/logUseCase";

export class LogController {
  constructor(private readonly logUseCase: LogUseCase) {}

  async createLog(req: Request, res: Response) {
    const { level, message }: { level: string; message: string } = req.body;

    const log = await this.logUseCase.createLog(level, message);

    res.status(200).json({
      id: log.id.value,
      level: log.level.value,
      message: log.message.value,
      timestamp: log.timestamp.value,
    });
  }
}
