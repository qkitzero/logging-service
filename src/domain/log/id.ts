import { validate } from 'uuid';

export class InvalidIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidIdError';
  }
}

export class Id {
  constructor(readonly value: string) {
    if (!validate(value)) {
      throw new InvalidIdError(`Invalid Id: ${value}`);
    }
  }
}
