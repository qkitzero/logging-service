import { Id } from './id';
import { Level } from './level';
import { Message } from './message';
import { ServiceName } from './serviceName';
import { Timestamp } from './timestamp';
import { UserId } from './userId';

export class Log {
  constructor(
    readonly id: Id,
    readonly serviceName: ServiceName,
    readonly level: Level,
    readonly message: Message,
    readonly timestamp: Timestamp,
    readonly userId: UserId | null = null,
  ) {}
}
