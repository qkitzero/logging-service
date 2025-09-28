import { LogId } from './logId';
import { LogLevel } from './logLevel';
import { LogMessage } from './logMessage';
import { LogTimestamp } from './logTimestamp';
import { ServiceName } from './serviceName';

export class Log {
  constructor(
    readonly id: LogId,
    readonly serviceName: ServiceName,
    readonly level: LogLevel,
    readonly message: LogMessage,
    readonly timestamp: LogTimestamp,
  ) {}
}
