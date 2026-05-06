export class Timestamp {
  static now(): Timestamp {
    return new Timestamp(new Date());
  }

  constructor(readonly value: Date) {}
}
