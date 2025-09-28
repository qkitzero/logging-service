import { Log } from "../domain/log/log";
import { LogRepository } from "../infrastructure/logRepository";
import { v4 } from "uuid";
import { LogId } from "../domain/log/logId";
import { ServiceName } from "../domain/log";
import { LogLevel } from "../domain/log/logLevel";
import { LogMessage } from "../domain/log/logMessage";
import { LogTimestamp } from "../domain/log/logTimestamp";

export class LogUseCase {
  constructor(private readonly logRepository: LogRepository) {}

  async createLog(
    serviceName: string,
    level: string,
    message: string
  ): Promise<Log> {
    const log = new Log(
      new LogId(v4()),
      new ServiceName(serviceName),
      new LogLevel(level),
      new LogMessage(message),
      new LogTimestamp(new Date())
    );

    await this.logRepository.create(log);

    return log;
  }

  async getAllLogs(): Promise<Log[]> {
    return this.logRepository.findAll();
  }
}
