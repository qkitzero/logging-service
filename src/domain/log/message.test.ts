import { InvalidMessageError, Message } from './message';

describe('Message', () => {
  it('should create a Message instance for a valid message', () => {
    const message = new Message('Test message');
    expect(message.value).toBe('Test message');
  });

  it('should throw an error for an empty message', () => {
    expect(() => new Message('')).toThrow(InvalidMessageError);
  });

  it('should throw an error for a message with only whitespace', () => {
    expect(() => new Message('   ')).toThrow(InvalidMessageError);
  });
});
