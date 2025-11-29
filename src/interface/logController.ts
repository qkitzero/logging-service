import { Request, Response } from 'express';
import { LogUseCase } from '../application/logUseCase';
import { CreateLogRequest, CreateLogResponse, GetAllLogsResponse } from './logSchema';

export class LogController {
  constructor(private readonly logUseCase: LogUseCase) {}

  createLog = async (req: Request, res: Response) => {
    const { serviceName, level, message } = req.body as CreateLogRequest;
    const userId = req.userId;

    const log = await this.logUseCase.createLog(serviceName, level, message, userId);

    const createLogResponse: CreateLogResponse = {
      id: log.id.value,
      serviceName: log.serviceName.value,
      level: log.level.value,
      message: log.message.value,
      timestamp: log.timestamp.value,
      userId: log.userId?.value,
    };

    res.status(200).json(createLogResponse);
  };

  getAllLogs = async (_req: Request, res: Response) => {
    const logs = await this.logUseCase.getAllLogs();

    const getAllLogsResponse: GetAllLogsResponse = logs.map((log) => ({
      id: log.id.value,
      serviceName: log.serviceName.value,
      level: log.level.value,
      message: log.message.value,
      timestamp: log.timestamp.value,
      userId: log.userId?.value,
    }));

    res.status(200).json(getAllLogsResponse);
  };
}
