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
      );
      mockLogUseCase.createLog.mockResolvedValue(log);

      await logController.createLog(req, res);

      expect(mockLogUseCase.createLog).toHaveBeenCalledWith('test-service', 'INFO', 'Test message');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: log.id.value,
        serviceName: log.serviceName.value,
        level: log.level.value,
        message: log.message.value,
        timestamp: log.timestamp.value,
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

      const log = new Log(
        new LogId(v4()),
        new LogServiceName('test-service'),
        new LogLevel('INFO'),
        new LogMessage('Test message'),
        new LogTimestamp(new Date()),
      );
      mockLogUseCase.getAllLogs.mockResolvedValue([log]);

      await logController.getAllLogs(req, res);

      expect(mockLogUseCase.getAllLogs).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          id: log.id.value,
          serviceName: log.serviceName.value,
          level: log.level.value,
          message: log.message.value,
          timestamp: log.timestamp.value,
        },
      ]);
    });
  });
});
