import { LogId } from "./logId";
import { LogLevel } from "./logLevel";
import { LogMessage } from "./logMessage";
import { LogTimestamp } from "./logTimestamp";

export class Log {
  constructor(
    readonly id: LogId,
    readonly level: LogLevel,
    readonly message: LogMessage,
    readonly timestamp: LogTimestamp
  ) {}
}
