import { ConsoleLogger } from './consoleLogger';

describe('ConsoleLogger', () => {
  const setup = () => {
    const logger = new ConsoleLogger();
    const spyConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    const spyConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    return { logger, spyConsoleLog, spyConsoleWarn, spyConsoleError };
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should write info to console.log as JSON', () => {
    const { logger, spyConsoleLog } = setup();
    logger.info({ message: 'hello' });
    expect(spyConsoleLog).toHaveBeenCalledWith(JSON.stringify({ message: 'hello' }));
  });

  it('should write warn to console.warn as JSON', () => {
    const { logger, spyConsoleWarn } = setup();
    logger.warn({ message: 'hello' });
    expect(spyConsoleWarn).toHaveBeenCalledWith(JSON.stringify({ message: 'hello' }));
  });

  it('should write error to console.error as JSON', () => {
    const { logger, spyConsoleError } = setup();
    logger.error({ message: 'hello' });
    expect(spyConsoleError).toHaveBeenCalledWith(JSON.stringify({ message: 'hello' }));
  });

  it('should write debug to console.log as JSON', () => {
    const { logger, spyConsoleLog } = setup();
    logger.debug({ message: 'hello' });
    expect(spyConsoleLog).toHaveBeenCalledWith(JSON.stringify({ message: 'hello' }));
  });
});
