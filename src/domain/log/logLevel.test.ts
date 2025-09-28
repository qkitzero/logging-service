import { LogLevel } from './logLevel';

describe('LogLevel', () => {
  it('should create a LogLevel instance for INFO', () => {
    const logLevel = new LogLevel(LogLevel.INFO);
    expect(logLevel.value).toBe(LogLevel.INFO);
  });

  it('should create a LogLevel instance for WARN', () => {
    const logLevel = new LogLevel(LogLevel.WARN);
    expect(logLevel.value).toBe(LogLevel.WARN);
  });

  it('should create a LogLevel instance for ERROR', () => {
    const logLevel = new LogLevel(LogLevel.ERROR);
    expect(logLevel.value).toBe(LogLevel.ERROR);
  });

  it('should create a LogLevel instance for DEBUG', () => {
    const logLevel = new LogLevel(LogLevel.DEBUG);
    expect(logLevel.value).toBe(LogLevel.DEBUG);
  });

  it('should throw an error for an invalid log level', () => {
    const invalidLogLevel = 'INVALID';
    expect(() => new LogLevel(invalidLogLevel)).toThrow(`Invalid LogLevel: ${invalidLogLevel}`);
  });
});
