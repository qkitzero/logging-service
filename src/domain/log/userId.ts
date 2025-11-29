export class InvalidUserIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUserIdError';
  }
}

export class UserId {
  constructor(readonly value: string) {
    if (value.trim().length === 0) {
      throw new InvalidUserIdError('UserId cannot be empty');
    }
  }
}
