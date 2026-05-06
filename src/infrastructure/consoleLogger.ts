import { Logger } from '../application/logger';

export class ConsoleLogger implements Logger {
  info(payload: unknown): void {
    console.log(JSON.stringify(payload));
  }

  warn(payload: unknown): void {
    console.warn(JSON.stringify(payload));
  }

  error(payload: unknown): void {
    console.error(JSON.stringify(payload));
  }

  debug(payload: unknown): void {
    console.log(JSON.stringify(payload));
  }
}
