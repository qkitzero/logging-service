import { LogTimestamp } from "./logTimestamp";

describe("LogTimestamp", () => {
  it("should create a LogTimestamp instance for a valid timestamp", () => {
    const date = new Date();
    const logTimestamp = new LogTimestamp(date);
    expect(logTimestamp.value).toBe(date);
  });
});
