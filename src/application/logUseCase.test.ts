import { LogRepository } from '../domain/log/repository';
import { LogUseCaseImpl } from './logUseCase';

describe('LogUseCase', () => {
  const setup = () => {
    const mockLogRepository: jest.Mocked<LogRepository> = {
      create: jest.fn(),
      findAll: jest.fn(),
    };
    const logUseCase = new LogUseCaseImpl(mockLogRepository);
    return { mockLogRepository, logUseCase };
  };

  describe('createLog', () => {
    const levels = [
      { serviceName: 'test-service', level: 'ERROR', message: 'Test message' },
      { serviceName: 'test-service', level: 'WARN', message: 'Test message' },
      { serviceName: 'test-service', level: 'INFO', message: 'Test message' },
      { serviceName: 'test-service', level: 'DEBUG', message: 'Test message' },
    ];
    it.each(levels)(
      'should handle logging and persistence properly when level is %s',
      async ({ serviceName, level, message }) => {
        const { mockLogRepository, logUseCase } = setup();

        const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        const spyConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const spyConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

        const log = await logUseCase.createLog(serviceName, level, message);

        switch (level) {
          case 'ERROR':
            expect(mockLogRepository.create).toHaveBeenCalled();
            expect(spyConsoleError).toHaveBeenCalled();
            expect(spyConsoleWarn).not.toHaveBeenCalled();
            expect(spyConsoleLog).not.toHaveBeenCalled();
            break;
          case 'WARN':
            expect(mockLogRepository.create).not.toHaveBeenCalled();
            expect(spyConsoleWarn).toHaveBeenCalled();
            expect(spyConsoleError).not.toHaveBeenCalled();
            expect(spyConsoleLog).not.toHaveBeenCalled();
            break;
          case 'INFO':
            expect(mockLogRepository.create).not.toHaveBeenCalled();
            expect(spyConsoleLog).toHaveBeenCalled();
            expect(spyConsoleError).not.toHaveBeenCalled();
            expect(spyConsoleWarn).not.toHaveBeenCalled();
            break;
          case 'DEBUG':
            expect(mockLogRepository.create).not.toHaveBeenCalled();
            expect(spyConsoleLog).toHaveBeenCalled();
            expect(spyConsoleError).not.toHaveBeenCalled();
            expect(spyConsoleWarn).not.toHaveBeenCalled();
            break;
        }

        expect(log.serviceName.value).toBe(serviceName);
        expect(log.level.value).toBe(level);
        expect(log.message.value).toBe(message);

        spyConsoleError.mockRestore();
        spyConsoleWarn.mockRestore();
        spyConsoleLog.mockRestore();
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
