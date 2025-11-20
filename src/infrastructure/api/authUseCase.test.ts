import createClient from 'openapi-fetch';
import { paths } from './auth.schema';
import { AuthError, AuthUseCaseImpl } from './authUseCase';

describe('AuthUseCase', () => {
  const setup = () => {
    const mockClient = createClient<paths>();
    const authUseCase = new AuthUseCaseImpl(mockClient);
    return { mockClient, authUseCase };
  };

  describe('verifyToken', () => {
    it('should return userId when verification is successful', async () => {
      const { mockClient, authUseCase } = setup();

      const token = 'test-token';
      const expectedUserId = 'user-id';

      mockClient.POST = jest.fn().mockResolvedValue({
        data: { userId: expectedUserId },
        error: undefined,
      });

      const userId = await authUseCase.verifyToken(token);

      expect(userId).toBe(expectedUserId);
      expect(mockClient.POST).toHaveBeenCalledWith('/v1/verify', {
        headers: { Authorization: `Bearer ${token}` },
        body: {},
      });
    });

    it('should throw AuthError when API client returns an error', async () => {
      const { mockClient, authUseCase } = setup();

      const token = 'test-token';

      mockClient.POST = jest.fn().mockResolvedValue({
        data: undefined,
        error: { message: 'Unauthorized' },
      });

      await expect(authUseCase.verifyToken(token)).rejects.toThrow(AuthError);
      expect(mockClient.POST).toHaveBeenCalledWith('/v1/verify', {
        headers: { Authorization: `Bearer ${token}` },
        body: {},
      });
    });

    it('should throw AuthError when error message is missing', async () => {
      const { mockClient, authUseCase } = setup();

      const token = 'test-token';

      mockClient.POST = jest.fn().mockResolvedValue({
        data: undefined,
        error: {},
      });

      await expect(authUseCase.verifyToken(token)).rejects.toThrow(AuthError);
      expect(mockClient.POST).toHaveBeenCalledWith('/v1/verify', {
        headers: { Authorization: `Bearer ${token}` },
        body: {},
      });
    });

    it('should throw AuthError when userId is missing in the response', async () => {
      const { mockClient, authUseCase } = setup();

      const token = 'test-token';

      mockClient.POST = jest.fn().mockResolvedValue({
        data: {},
        error: undefined,
      });

      await expect(authUseCase.verifyToken(token)).rejects.toThrow(AuthError);
      expect(mockClient.POST).toHaveBeenCalledWith('/v1/verify', {
        headers: { Authorization: `Bearer ${token}` },
        body: {},
      });
    });
  });
});
