export class LogLevel {
  static readonly INFO: string = 'INFO';
  static readonly WARN: string = 'WARN';
  static readonly ERROR: string = 'ERROR';
  static readonly DEBUG: string = 'DEBUG';

  constructor(readonly value: string) {
    if (
      value !== LogLevel.INFO &&
      value !== LogLevel.WARN &&
      value !== LogLevel.ERROR &&
      value !== LogLevel.DEBUG
    ) {
      throw new Error(`Invalid LogLevel: ${value}`);
    }
  }
}
