export class LogMessage {
  constructor(readonly value: string) {
    if (value.trim().length === 0) {
      throw new Error("LogMessage cannot be empty");
    }
  }
}
