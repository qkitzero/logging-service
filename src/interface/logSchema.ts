import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const CreateLogRequestSchema = z
  .object({
    serviceName: z.string(),
    level: z.string(),
    message: z.string(),
  })
  .openapi('CreateLogRequest');

export type CreateLogRequest = z.infer<typeof CreateLogRequestSchema>;

export const CreateLogResponseSchema = z
  .object({
    id: z.uuidv4(),
    serviceName: z.string(),
    level: z.string(),
    message: z.string(),
    timestamp: z.date(),
    userId: z.string().optional(),
  })
  .openapi('CreateLogResponse');

export type CreateLogResponse = z.infer<typeof CreateLogResponseSchema>;

export const GetAllLogsResponseSchema = z
  .array(
    z.object({
      id: z.uuidv4(),
      serviceName: z.string(),
      level: z.string(),
      message: z.string(),
      timestamp: z.date(),
      userId: z.string().optional(),
    }),
  )
  .openapi('GetAllLogsResponse');

export type GetAllLogsResponse = z.infer<typeof GetAllLogsResponseSchema>;
