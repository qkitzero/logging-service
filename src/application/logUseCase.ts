import { v4 } from 'uuid';
import { ServiceName as LogServiceName } from '../domain/log';
import { Id as LogId } from '../domain/log/id';
import { Level as LogLevel } from '../domain/log/level';
import { Log } from '../domain/log/log';
import { Message as LogMessage } from '../domain/log/message';
import { LogRepository } from '../domain/log/repository';
import { Timestamp as LogTimestamp } from '../domain/log/timestamp';

export interface LogUseCase {
  createLog(serviceName: string, level: string, message: string): Promise<Log>;
  getAllLogs(): Promise<Log[]>;
}

export class LogUseCaseImpl implements LogUseCase {
  constructor(private readonly logRepository: LogRepository) {}

  async createLog(serviceName: string, level: string, message: string): Promise<Log> {
    const log = new Log(
      new LogId(v4()),
      new LogServiceName(serviceName),
      new LogLevel(level),
      new LogMessage(message),
      new LogTimestamp(new Date()),
    );

    if (log.level.value === LogLevel.ERROR) await this.logRepository.create(log);

    const output = {
      id: log.id.value,
      serviceName: log.serviceName.value,
      level: log.level.value,
      message: log.message.value,
      timestamp: log.timestamp.value,
    };

    switch (log.level.value) {
      case LogLevel.ERROR:
        console.error(JSON.stringify(output));
        break;
      case LogLevel.WARN:
        console.warn(JSON.stringify(output));
        break;
      default:
        console.log(JSON.stringify(output));
        break;
    }

    return log;
  }

  async getAllLogs(): Promise<Log[]> {
    return this.logRepository.findAll();
  }
}
