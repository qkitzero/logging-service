import { ILogRepository } from "../domain/log/logRepository";
import { Log } from "../domain/log/log";
import { PrismaClient } from "@prisma/client";

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
}
