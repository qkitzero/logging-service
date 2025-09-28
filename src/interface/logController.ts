import { Request, Response } from 'express';
import { LogUseCase } from '../application/logUseCase';

export class LogController {
  constructor(private readonly logUseCase: LogUseCase) {}

  async createLog(req: Request, res: Response) {
    const {
      serviceName,
      level,
      message,
    }: {
      serviceName: string;
      level: string;
      message: string;
    } = req.body;

    const log = await this.logUseCase.createLog(serviceName, level, message);

    res.status(200).json({
      id: log.id.value,
      serviceName: log.serviceName.value,
      level: log.level.value,
      message: log.message.value,
      timestamp: log.timestamp.value,
    });
  }

  async getAllLogs(req: Request, res: Response) {
    const logs = await this.logUseCase.getAllLogs();

    res.status(200).json(
      logs.map((log) => ({
        id: log.id.value,
        serviceName: log.serviceName.value,
        level: log.level.value,
        message: log.message.value,
        timestamp: log.timestamp.value,
      })),
    );
  }
}
