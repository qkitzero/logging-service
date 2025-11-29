import { InvalidUserIdError, UserId } from './userId';

describe('UserId', () => {
  it('should create a UserId instance for a valid user id', () => {
    const userId = new UserId('user-id');
    expect(userId.value).toBe('user-id');
  });

  it('should throw an error for an empty user id', () => {
    expect(() => new UserId('')).toThrow(InvalidUserIdError);
  });

  it('should throw an error for a user id with only whitespace', () => {
    expect(() => new UserId('   ')).toThrow(InvalidUserIdError);
  });
});
