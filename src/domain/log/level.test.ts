import { InvalidLevelError, Level } from './level';

describe('Level', () => {
  it('should create a Level instance for INFO', () => {
    const level = new Level(Level.INFO);
    expect(level.value).toBe(Level.INFO);
  });

  it('should create a Level instance for WARN', () => {
    const level = new Level(Level.WARN);
    expect(level.value).toBe(Level.WARN);
  });

  it('should create a Level instance for ERROR', () => {
    const level = new Level(Level.ERROR);
    expect(level.value).toBe(Level.ERROR);
  });

  it('should create a Level instance for DEBUG', () => {
    const level = new Level(Level.DEBUG);
    expect(level.value).toBe(Level.DEBUG);
  });

  it('should throw an error for an invalid log level', () => {
    const invalidLevel = 'INVALID';
    expect(() => new Level(invalidLevel)).toThrow(InvalidLevelError);
  });
});
