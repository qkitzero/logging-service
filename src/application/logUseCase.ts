import { Id as LogId } from '../domain/log/id';
import { Level as LogLevel } from '../domain/log/level';
import { Log } from '../domain/log/log';
import { Message as LogMessage } from '../domain/log/message';
import { LogRepository } from '../domain/log/repository';
import { ServiceName as LogServiceName } from '../domain/log/serviceName';
import { Timestamp as LogTimestamp } from '../domain/log/timestamp';
import { UserId as LogUserId } from '../domain/log/userId';
import { Logger } from './logger';

export interface LogUseCase {
  createLog(
    serviceName: LogServiceName,
    level: LogLevel,
    message: LogMessage,
    userId?: LogUserId,
  ): Promise<Log>;
  getAllLogs(): Promise<Log[]>;
}

export class LogUseCaseImpl implements LogUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly logger: Logger,
  ) {}

  async createLog(
    serviceName: LogServiceName,
    level: LogLevel,
    message: LogMessage,
    userId?: LogUserId,
  ): Promise<Log> {
    const log = new Log(
      LogId.generate(),
      serviceName,
      level,
      message,
      LogTimestamp.now(),
      userId ?? null,
    );

    if (log.shouldSave()) await this.logRepository.create(log);

    const output = {
      id: log.id.value,
      serviceName: log.serviceName.value,
      level: log.level.value,
      message: log.message.value,
      timestamp: log.timestamp.value,
      userId: log.userId?.value,
    };

    switch (log.level.value) {
      case LogLevel.ERROR:
        this.logger.error(output);
        break;
      case LogLevel.WARN:
        this.logger.warn(output);
        break;
      case LogLevel.DEBUG:
        this.logger.debug(output);
        break;
      default:
        this.logger.info(output);
        break;
    }

    return log;
  }

  async getAllLogs(): Promise<Log[]> {
    return this.logRepository.findAll();
  }
}
