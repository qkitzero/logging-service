export interface AuthUseCase {
  verifyToken(token: string): Promise<string>;
}
