import { ILogRepository } from "../domain/log/logRepository";
import { Log } from "../domain/log/log";

export class LogRepository implements ILogRepository {
  async create(log: Log): Promise<void> {
    console.log("create log:", log);
  }
}
