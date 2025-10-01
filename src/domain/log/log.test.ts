import { v4 } from 'uuid';
import { Id } from './id';
import { Level } from './level';
import { Log } from './log';
import { Message } from './message';
import { ServiceName } from './serviceName';
import { Timestamp } from './timestamp';

describe('Log', () => {
  it('should create a Log instance with correct values', () => {
    const id = new Id(v4());
    const serviceName = new ServiceName('test-service');
    const level = new Level(Level.INFO);
    const message = new Message('Test log message');
    const timestamp = new Timestamp(new Date());

    const log = new Log(id, serviceName, level, message, timestamp);

    expect(log.id).toBe(id);
    expect(log.serviceName).toBe(serviceName);
    expect(log.level).toBe(level);
    expect(log.message).toBe(message);
    expect(log.timestamp).toBe(timestamp);
  });
});
