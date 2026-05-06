import { v4 } from 'uuid';
import { Id } from './id';
import { Level } from './level';
import { Log } from './log';
import { Message } from './message';
import { ServiceName } from './serviceName';
import { Timestamp } from './timestamp';
import { UserId } from './userId';

describe('Log', () => {
  it('should create a Log instance with correct values', () => {
    const id = new Id(v4());
    const serviceName = new ServiceName('test-service');
    const level = new Level(Level.INFO);
    const message = new Message('Test log message');
    const timestamp = new Timestamp(new Date());
    const userId = new UserId('user-id');

    const log = new Log(id, serviceName, level, message, timestamp, userId);

    expect(log.id).toBe(id);
    expect(log.serviceName).toBe(serviceName);
    expect(log.level).toBe(level);
    expect(log.message).toBe(message);
    expect(log.timestamp).toBe(timestamp);
    expect(log.userId).toBe(userId);
  });

  it('should create a Log instance with correct values without userId', () => {
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
    expect(log.userId).toBeNull();
  });

  describe('shouldSave', () => {
    const buildLog = (level: string) =>
      new Log(
        new Id(v4()),
        new ServiceName('test-service'),
        new Level(level),
        new Message('Test log message'),
        new Timestamp(new Date()),
      );

    it.each(
      Level.ALL.map((level) => ({
        level,
        expected: level !== Level.DEBUG,
      })),
    )('should return $expected when level is $level', ({ level, expected }) => {
      expect(buildLog(level).shouldSave()).toBe(expected);
    });
  });
});
