import { LogId } from "./logId";
import { v4 } from "uuid";

describe("LogId", () => {
  it("should create a LogId instance for a valid UUID", () => {
    const validUuid = v4();
    const logId = new LogId(validUuid);
    expect(logId.value).toBe(validUuid);
  });

  it("should throw an error for an invalid UUID", () => {
    const invalidUuid = "not-a-uuid";
    expect(() => new LogId(invalidUuid)).toThrow(
      `Invalid LogId: ${invalidUuid}`
    );
  });
});
