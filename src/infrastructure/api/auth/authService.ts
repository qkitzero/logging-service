import createClient from 'openapi-fetch';
import { AuthService } from '../../../application/authService';
import { AuthError } from '../../../application/errors';
import { paths } from './schema';

export class AuthServiceImpl implements AuthService {
  constructor(private readonly client: ReturnType<typeof createClient<paths>>) {}

  async verifyToken(token: string): Promise<string> {
    const { data, error } = await this.client.POST('/v1/verify', {
      headers: { Authorization: `Bearer ${token}` },
      body: {},
    });

    if (error) {
      throw new AuthError(error.message || 'Failed to verify token');
    }

    const userId = data.userId;
    if (!userId) {
      throw new AuthError('UserId is missing');
    }

    return userId;
  }
}
