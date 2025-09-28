import { ILogRepository } from "../domain/log/logRepository";
import { Log } from "../domain/log/log";
import { PrismaClient } from "@prisma/client";
import {
  LogId,
  LogLevel,
  LogMessage,
  LogTimestamp,
  ServiceName,
} from "../domain/log";

export class LogRepository implements ILogRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(log: Log): Promise<void> {
    await this.prisma.log.create({
      data: {
        id: log.id.value,
        serviceName: log.serviceName.value,
        level: log.level.value,
        message: log.message.value,
        timestamp: log.timestamp.value,
      },
    });
  }

  async findAll(): Promise<Log[]> {
    const logs = await this.prisma.log.findMany();
    return logs.map(
      (log) =>
        new Log(
          new LogId(log.id),
          new ServiceName(log.serviceName),
          new LogLevel(log.level),
          new LogMessage(log.message),
          new LogTimestamp(log.timestamp)
        )
    );
  }
}
