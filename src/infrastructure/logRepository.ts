import { PrismaClient } from '@prisma/client';
import {
  Id as LogId,
  Level as LogLevel,
  Message as LogMessage,
  ServiceName as LogServiceName,
  Timestamp as LogTimestamp,
} from '../domain/log';
import { Log } from '../domain/log/log';
import { LogRepository } from '../domain/log/repository';

export class PrismaLogRepository implements LogRepository {
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
          new LogServiceName(log.serviceName),
          new LogLevel(log.level),
          new LogMessage(log.message),
          new LogTimestamp(log.timestamp),
        ),
    );
  }
}
