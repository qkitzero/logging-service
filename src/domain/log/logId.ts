import { validate } from "uuid";

export class LogId {
  constructor(readonly value: string) {
    if (!validate(value)) {
      throw new Error(`Invalid LogId: ${value}`);
    }
  }
}
