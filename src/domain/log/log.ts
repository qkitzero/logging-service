import { Id } from './id';
import { Level } from './level';
import { Message } from './message';
import { ServiceName } from './serviceName';
import { Timestamp } from './timestamp';

export class Log {
  constructor(
    readonly id: Id,
    readonly serviceName: ServiceName,
    readonly level: Level,
    readonly message: Message,
    readonly timestamp: Timestamp,
  ) {}
}
