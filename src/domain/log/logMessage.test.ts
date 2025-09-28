import { LogMessage } from './logMessage';

describe('LogMessage', () => {
  it('should create a LogMessage instance for a valid message', () => {
    const message = 'Test log message';
    const logMessage = new LogMessage(message);
    expect(logMessage.value).toBe(message);
  });

  it('should throw an error for an empty message', () => {
    expect(() => new LogMessage('')).toThrow('LogMessage cannot be empty');
  });

  it('should throw an error for a message with only whitespace', () => {
    expect(() => new LogMessage('   ')).toThrow('LogMessage cannot be empty');
  });
});
