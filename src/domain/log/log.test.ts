import { Log } from "./log";
import { LogId } from "./logId";
import { LogLevel } from "./logLevel";
import { LogMessage } from "./logMessage";
import { LogTimestamp } from "./logTimestamp";
import { v4 as uuidv4 } from "uuid";

describe("Log", () => {
  it("should create a Log instance with correct values", () => {
    const id = new LogId(uuidv4());
    const level = new LogLevel(LogLevel.INFO);
    const message = new LogMessage("Test log message");
    const timestamp = new LogTimestamp(new Date());

    const log = new Log(id, level, message, timestamp);

    expect(log.id).toBe(id);
    expect(log.level).toBe(level);
    expect(log.message).toBe(message);
    expect(log.timestamp).toBe(timestamp);
  });
});
