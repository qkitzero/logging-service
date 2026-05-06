export interface Logger {
  info(payload: unknown): void;
  warn(payload: unknown): void;
  error(payload: unknown): void;
  debug(payload: unknown): void;
}
