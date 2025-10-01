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

  constructor(readonly value: string) {
    if (
      value !== Level.INFO &&
      value !== Level.WARN &&
      value !== Level.ERROR &&
      value !== Level.DEBUG
    ) {
      throw new InvalidLevelError(`Invalid Level: ${value}`);
    }
  }
}
