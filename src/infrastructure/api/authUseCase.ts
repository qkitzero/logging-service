import createClient from 'openapi-fetch';
import { AuthUseCase } from '../../application/authUseCase';
import { paths } from './auth/schema';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class AuthUseCaseImpl implements AuthUseCase {
  private readonly client: ReturnType<typeof createClient<paths>>;

  constructor() {
    const protocol = process.env.ENV === 'production' ? 'https' : 'http';
    const host = process.env.AUTH_SERVICE_HOST;
    const port = process.env.AUTH_SERVICE_PORT;
    const baseUrl = `${protocol}://${host}:${port}`;
    this.client = createClient<paths>({ baseUrl });
  }

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
