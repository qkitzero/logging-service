import { v4 } from 'uuid';
import { ServiceName } from '../domain/log';
import { Id as LogId } from '../domain/log/id';
import { Level as LogLevel } from '../domain/log/level';
import { Log } from '../domain/log/log';
import { Message as LogMessage } from '../domain/log/message';
import { Timestamp as LogTimestamp } from '../domain/log/timestamp';
import { LogRepository } from '../infrastructure/logRepository';

export class LogUseCase {
  constructor(private readonly logRepository: LogRepository) {}

  async createLog(serviceName: string, level: string, message: string): Promise<Log> {
    const log = new Log(
      new LogId(v4()),
      new ServiceName(serviceName),
      new LogLevel(level),
      new LogMessage(message),
      new LogTimestamp(new Date()),
    );

    await this.logRepository.create(log);

    const output = {
      id: log.id.value,
      serviceName: log.serviceName.value,
      level: log.level.value,
      message: log.message.value,
      timestamp: log.timestamp.value,
    };

    switch (log.level.value) {
      case LogLevel.ERROR:
        console.error(output);
        break;
      case LogLevel.WARN:
        console.warn(output);
        break;
      default:
        console.log(output);
        break;
    }

    return log;
  }

  async getAllLogs(): Promise<Log[]> {
    return this.logRepository.findAll();
  }
}
