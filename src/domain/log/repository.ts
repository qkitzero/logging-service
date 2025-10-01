import { Log } from './log';

export interface ILogRepository {
  create(log: Log): Promise<void>;
}
