import { Request, Response } from 'express';
import { AuthUseCase } from '../application/authUseCase';
import { LogUseCase } from '../application/logUseCase';
import { AuthError } from '../infrastructure/api/authUseCase';
import { CreateLogRequest, CreateLogResponse, GetAllLogsResponse } from './logSchema';

export class LogController {
  constructor(
    private readonly authUseCase: AuthUseCase,
    private readonly logUseCase: LogUseCase,
  ) {}

  async createLog(req: Request, res: Response) {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({
        error: AuthError.name,
        message: 'Token is missing',
      });
    }

    const [scheme, token] = header.split(' ');
    if (scheme.toLowerCase() !== 'bearer' || !token) {
      return res.status(401).json({
        error: AuthError.name,
        message: 'Invalid Authorization format',
      });
    }

    try {
      await this.authUseCase.verifyToken(token);
    } catch (error) {
      if (error instanceof AuthError) {
        return res.status(401).json({
          error: error.name,
          message: error.message,
        });
      }

      return res.status(500).json({
        error: 'InternalServerError',
        message: 'Unexpected server error',
      });
    }

    const { serviceName, level, message } = req.body as CreateLogRequest;

    const log = await this.logUseCase.createLog(serviceName, level, message);

    const createLogResponse: CreateLogResponse = {
      id: log.id.value,
      serviceName: log.serviceName.value,
      level: log.level.value,
      message: log.message.value,
      timestamp: log.timestamp.value,
    };

    res.status(200).json(createLogResponse);
  }

  async getAllLogs(_req: Request, res: Response) {
    const logs = await this.logUseCase.getAllLogs();

    const getAllLogsResponse: GetAllLogsResponse = logs.map((log) => ({
      id: log.id.value,
      serviceName: log.serviceName.value,
      level: log.level.value,
      message: log.message.value,
      timestamp: log.timestamp.value,
    }));

    res.status(200).json(getAllLogsResponse);
  }
}
