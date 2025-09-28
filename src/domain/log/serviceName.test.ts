import { InvalidServiceNameError, ServiceName } from './serviceName';

describe('ServiceName', () => {
  it('should create a ServiceName for a valid service name', () => {
    const serviceName = new ServiceName('test-service');
    expect(serviceName.value).toBe('test-service');
  });

  it('should throw an error for an empty service name', () => {
    expect(() => new ServiceName('')).toThrow(InvalidServiceNameError);
  });

  it('should throw an error for a service name with only whitespace', () => {
    expect(() => new ServiceName('   ')).toThrow(InvalidServiceNameError);
  });

  it('should throw an error when a service name exceeds the maximum length', () => {
    expect(() => new ServiceName('a'.repeat(ServiceName.MAX_LENGTH + 1))).toThrow(
      InvalidServiceNameError,
    );
  });
});
