import { Level } from '../domain/log/level';
import { Message } from '../domain/log/message';
import { LogRepository } from '../domain/log/repository';
import { ServiceName } from '../domain/log/serviceName';
import { UserId } from '../domain/log/userId';
import { Logger } from './logger';
import { LogUseCaseImpl } from './logUseCase';

describe('LogUseCase', () => {
  const setup = () => {
    const mockLogRepository: jest.Mocked<LogRepository> = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };
    const mockLogger: jest.Mocked<Logger> = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };
    const logUseCase = new LogUseCaseImpl(mockLogRepository, mockLogger);
    return { mockLogRepository, mockLogger, logUseCase };
  };

  describe('createLog', () => {
    const cases = [
      { serviceName: 'test-service', level: 'ERROR', message: 'Test message', userId: 'user-id' },
      { serviceName: 'test-service', level: 'WARN', message: 'Test message', userId: undefined },
      { serviceName: 'test-service', level: 'INFO', message: 'Test message', userId: 'user-id' },
      { serviceName: 'test-service', level: 'DEBUG', message: 'Test message', userId: undefined },
    ];
    it.each(cases)(
      'should handle logging and persistence properly when level is %s and userId is %s',
      async ({ serviceName, level, message, userId }) => {
        const { mockLogRepository, mockLogger, logUseCase } = setup();

        const log = await logUseCase.createLog(
          new ServiceName(serviceName),
          new Level(level),
          new Message(message),
          userId ? new UserId(userId) : undefined,
        );

        switch (level) {
          case 'ERROR':
            expect(mockLogRepository.create).toHaveBeenCalled();
            expect(mockLogger.error).toHaveBeenCalled();
            expect(mockLogger.warn).not.toHaveBeenCalled();
            expect(mockLogger.info).not.toHaveBeenCalled();
            expect(mockLogger.debug).not.toHaveBeenCalled();
            break;
          case 'WARN':
            expect(mockLogRepository.create).toHaveBeenCalled();
            expect(mockLogger.warn).toHaveBeenCalled();
            expect(mockLogger.error).not.toHaveBeenCalled();
            expect(mockLogger.info).not.toHaveBeenCalled();
            expect(mockLogger.debug).not.toHaveBeenCalled();
            break;
          case 'INFO':
            expect(mockLogRepository.create).toHaveBeenCalled();
            expect(mockLogger.info).toHaveBeenCalled();
            expect(mockLogger.error).not.toHaveBeenCalled();
            expect(mockLogger.warn).not.toHaveBeenCalled();
            expect(mockLogger.debug).not.toHaveBeenCalled();
            break;
          case 'DEBUG':
            expect(mockLogRepository.create).not.toHaveBeenCalled();
            expect(mockLogger.debug).toHaveBeenCalled();
            expect(mockLogger.error).not.toHaveBeenCalled();
            expect(mockLogger.warn).not.toHaveBeenCalled();
            expect(mockLogger.info).not.toHaveBeenCalled();
            break;
        }

        expect(log.serviceName.value).toBe(serviceName);
        expect(log.level.value).toBe(level);
        expect(log.message.value).toBe(message);
        expect(log.userId?.value ?? null).toBe(userId ?? null);
      },
    );
  });

  describe('getAllLogs', () => {
    it('should return all logs from the repository', async () => {
      const { mockLogRepository, logUseCase } = setup();

      await logUseCase.getAllLogs();

      expect(mockLogRepository.findAll).toHaveBeenCalled();
    });
  });
});
