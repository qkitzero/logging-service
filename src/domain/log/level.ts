export class InvalidLevelError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidLevelError';
  }
}

export class Level {
  static readonly INFO: string = 'INFO';
  static readonly WARN: string = 'WARN';
  static readonly ERROR: string = 'ERROR';
  static readonly DEBUG: string = 'DEBUG';

  static readonly ALL = [Level.INFO, Level.WARN, Level.ERROR, Level.DEBUG] as const;

  constructor(readonly value: string) {
    if (!Level.ALL.includes(value)) {
      throw new InvalidLevelError(`Invalid Level: ${value}`);
    }
  }
}
