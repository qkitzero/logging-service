import createClient from 'openapi-fetch';
import { AuthError, AuthServiceImpl } from './authService';
import { paths } from './schema';

describe('AuthService', () => {
  const setup = () => {
    const mockClient = createClient<paths>();
    const authService = new AuthServiceImpl(mockClient);
    return { mockClient, authService };
  };

  describe('verifyToken', () => {
    it('should return userId when verification is successful', async () => {
      const { mockClient, authService } = setup();

      const token = 'test-token';
      const expectedUserId = 'user-id';

      mockClient.POST = jest.fn().mockResolvedValue({
        data: { userId: expectedUserId },
        error: undefined,
      });

      const userId = await authService.verifyToken(token);

      expect(userId).toBe(expectedUserId);
      expect(mockClient.POST).toHaveBeenCalledWith('/v1/verify', {
        headers: { Authorization: `Bearer ${token}` },
        body: {},
      });
    });

    it('should throw AuthError when API client returns an error', async () => {
      const { mockClient, authService } = setup();

      const token = 'test-token';

      mockClient.POST = jest.fn().mockResolvedValue({
        data: undefined,
        error: { message: 'Unauthorized' },
      });

      await expect(authService.verifyToken(token)).rejects.toThrow(new AuthError('Unauthorized'));
      expect(mockClient.POST).toHaveBeenCalledWith('/v1/verify', {
        headers: { Authorization: `Bearer ${token}` },
        body: {},
      });
    });

    it('should throw AuthError when error message is missing', async () => {
      const { mockClient, authService } = setup();

      const token = 'test-token';

      mockClient.POST = jest.fn().mockResolvedValue({
        data: undefined,
        error: {},
      });

      await expect(authService.verifyToken(token)).rejects.toThrow(
        new AuthError('Failed to verify token'),
      );
      expect(mockClient.POST).toHaveBeenCalledWith('/v1/verify', {
        headers: { Authorization: `Bearer ${token}` },
        body: {},
      });
    });

    it('should throw AuthError when userId is missing in the response', async () => {
      const { mockClient, authService } = setup();

      const token = 'test-token';

      mockClient.POST = jest.fn().mockResolvedValue({
        data: {},
        error: undefined,
      });

      await expect(authService.verifyToken(token)).rejects.toThrow(
        new AuthError('UserId is missing'),
      );
      expect(mockClient.POST).toHaveBeenCalledWith('/v1/verify', {
        headers: { Authorization: `Bearer ${token}` },
        body: {},
      });
    });
  });
});
