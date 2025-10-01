export class InvalidMessageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidMessageError';
  }
}

export class Message {
  constructor(readonly value: string) {
    if (value.trim().length === 0) {
      throw new InvalidMessageError('Message cannot be empty');
    }
  }
}
