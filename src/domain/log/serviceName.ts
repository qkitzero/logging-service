export class InvalidServiceNameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidServiceNameError";
  }
}

export class ServiceName {
  static readonly MAX_LENGTH = 50;

  constructor(readonly value: string) {
    if (value.trim().length === 0) {
      throw new InvalidServiceNameError("ServiceName cannot be empty");
    }

    if (value.length > ServiceName.MAX_LENGTH) {
      throw new InvalidServiceNameError(
        `ServiceName cannot exceed ${ServiceName.MAX_LENGTH} characters`
      );
    }
  }
}
