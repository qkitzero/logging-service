import { v4, validate } from 'uuid';

export class InvalidIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidIdError';
  }
}

export class Id {
  static generate(): Id {
    return new Id(v4());
  }

  constructor(readonly value: string) {
    if (!validate(value)) {
      throw new InvalidIdError(`Invalid Id: ${value}`);
    }
  }
}
