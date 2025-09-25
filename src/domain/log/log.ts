import { LogId } from "./logId";
import { ServiceName } from "./serviceName";
import { LogLevel } from "./logLevel";
import { LogMessage } from "./logMessage";
import { LogTimestamp } from "./logTimestamp";

export class Log {
  constructor(
    readonly id: LogId,
    readonly serviceName: ServiceName,
    readonly level: LogLevel,
    readonly message: LogMessage,
    readonly timestamp: LogTimestamp
  ) {}
}
