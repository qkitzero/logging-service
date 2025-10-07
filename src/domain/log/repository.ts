import { Log } from './log';

export interface LogRepository {
  create(log: Log): Promise<void>;
  findAll(): Promise<Log[]>;
}
