import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { LogUseCase } from '../application/logUseCase';
import {
  Log,
  Id as LogId,
  Level as LogLevel,
  Message as LogMessage,
  ServiceName as LogServiceName,
  Timestamp as LogTimestamp,
  UserId as LogUserId,
} from '../domain/log';
import { LogController } from './logController';

describe('LogController', () => {
  const setup = () => {
    const mockLogUseCase: jest.Mocked<LogUseCase> = {
      createLog: jest.fn(),
      getAllLogs: jest.fn(),
    };
    const logController = new LogController(mockLogUseCase);
    return { mockLogUseCase, logController };
  };

  describe('createLog', () => {
    it('should create a log and return 200', async () => {
      const { mockLogUseCase, logController } = setup();

      const req = {
        body: {
          serviceName: 'test-service',
          level: 'INFO',
          message: 'Test message',
        },
        userId: 'user-id',
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const log = new Log(
        new LogId(v4()),
        new LogServiceName('test-service'),
        new LogLevel('INFO'),
        new LogMessage('Test message'),
        new LogTimestamp(new Date()),
        new LogUserId('user-id'),
      );
      mockLogUseCase.createLog.mockResolvedValue(log);

      await logController.createLog(req, res);

      expect(mockLogUseCase.createLog).toHaveBeenCalledWith(
        'test-service',
        'INFO',
        'Test message',
        'user-id',
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: log.id.value,
        serviceName: log.serviceName.value,
        level: log.level.value,
        message: log.message.value,
        timestamp: log.timestamp.value,
        userId: log.userId?.value,
      });
    });

    it('should create a log without userId and return 200', async () => {
      const { mockLogUseCase, logController } = setup();

      const req = {
        body: {
          serviceName: 'test-service',
          level: 'INFO',
          message: 'Test message',
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const log = new Log(
        new LogId(v4()),
        new LogServiceName('test-service'),
        new LogLevel('INFO'),
        new LogMessage('Test message'),
        new LogTimestamp(new Date()),
        null,
      );
      mockLogUseCase.createLog.mockResolvedValue(log);

      await logController.createLog(req, res);

      expect(mockLogUseCase.createLog).toHaveBeenCalledWith(
        'test-service',
        'INFO',
        'Test message',
        undefined,
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: log.id.value,
        serviceName: log.serviceName.value,
        level: log.level.value,
        message: log.message.value,
        timestamp: log.timestamp.value,
        userId: undefined,
      });
    });
  });

  describe('getAllLogs', () => {
    it('should get all logs and return 200', async () => {
      const { mockLogUseCase, logController } = setup();

      const req = {} as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const log1 = new Log(
        new LogId(v4()),
        new LogServiceName('test-service-1'),
        new LogLevel('INFO'),
        new LogMessage('Test message'),
        new LogTimestamp(new Date()),
        new LogUserId('user-id'),
      );
      const log2 = new Log(
        new LogId(v4()),
        new LogServiceName('test-service-2'),
        new LogLevel('WARN'),
        new LogMessage('Test message'),
        new LogTimestamp(new Date()),
        null,
      );
      mockLogUseCase.getAllLogs.mockResolvedValue([log1, log2]);

      await logController.getAllLogs(req, res);

      expect(mockLogUseCase.getAllLogs).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          id: log1.id.value,
          serviceName: log1.serviceName.value,
          level: log1.level.value,
          message: log1.message.value,
          timestamp: log1.timestamp.value,
          userId: log1.userId?.value,
        },
        {
          id: log2.id.value,
          serviceName: log2.serviceName.value,
          level: log2.level.value,
          message: log2.message.value,
          timestamp: log2.timestamp.value,
          userId: undefined,
        },
      ]);
    });
  });
});
