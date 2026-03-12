import { ApplicationError, AuthError } from './errors';

describe('ApplicationError', () => {
  it('should set the name to the class name', () => {
    const error = new ApplicationError('test');
    expect(error.name).toBe('ApplicationError');
  });

  it('should set the message', () => {
    const error = new ApplicationError('test message');
    expect(error.message).toBe('test message');
  });

  it('should be an instance of Error', () => {
    const error = new ApplicationError('test');
    expect(error).toBeInstanceOf(Error);
  });
});

describe('AuthError', () => {
  it('should set the name to AuthError', () => {
    const error = new AuthError('test');
    expect(error.name).toBe('AuthError');
  });

  it('should be an instance of ApplicationError', () => {
    const error = new AuthError('test');
    expect(error).toBeInstanceOf(ApplicationError);
  });
});
