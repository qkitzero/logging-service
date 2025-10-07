import { LogRepository } from '../domain/log/repository';
import { LogUseCase } from './logUseCase';

describe('LogUseCase', () => {
  const setup = () => {
    const mockLogRepository: jest.Mocked<LogRepository> = {
      create: jest.fn(),
      findAll: jest.fn(),
    };
    const logUseCase = new LogUseCase(mockLogRepository);
    return { mockLogRepository, logUseCase };
  };

  describe('createLog', () => {
    it('should create a log and call repository.create', async () => {
      const { mockLogRepository, logUseCase } = setup();

      const spyConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

      const log = await logUseCase.createLog('test-service', 'INFO', 'Test message');

      expect(mockLogRepository.create).toHaveBeenCalled();
      expect(spyConsoleLog).toHaveBeenCalled();
      expect(log.serviceName.value).toBe('test-service');
      expect(log.level.value).toBe('INFO');
      expect(log.message.value).toBe('Test message');

      spyConsoleLog.mockRestore();
    });

    const levels = [
      { level: 'ERROR', method: 'error' },
      { level: 'WARN', method: 'warn' },
      { level: 'INFO', method: 'log' },
      { level: 'DEBUG', method: 'log' },
    ];
    it.each(levels)('should call console.%s for %s level', async ({ level, method }) => {
      const { logUseCase } = setup();

      const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      const spyConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const spyConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

      await logUseCase.createLog('test-service', level, 'Test message');

      switch (method) {
        case 'error':
          expect(spyConsoleError).toHaveBeenCalled();
          expect(spyConsoleWarn).not.toHaveBeenCalled();
          expect(spyConsoleLog).not.toHaveBeenCalled();
          break;
        case 'warn':
          expect(spyConsoleWarn).toHaveBeenCalled();
          expect(spyConsoleError).not.toHaveBeenCalled();
          expect(spyConsoleLog).not.toHaveBeenCalled();
          break;
        case 'log':
          expect(spyConsoleLog).toHaveBeenCalled();
          expect(spyConsoleError).not.toHaveBeenCalled();
          expect(spyConsoleWarn).not.toHaveBeenCalled();
          break;
      }

      spyConsoleError.mockRestore();
      spyConsoleWarn.mockRestore();
      spyConsoleLog.mockRestore();
    });
  });

  describe('getAllLogs', () => {
    it('should return all logs from the repository', async () => {
      const { mockLogRepository, logUseCase } = setup();

      await logUseCase.getAllLogs();

      expect(mockLogRepository.findAll).toHaveBeenCalled();
    });
  });
});
