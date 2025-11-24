import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import {
  CreateLogRequestSchema,
  CreateLogResponseSchema,
  GetAllLogsRequestSchema,
  GetAllLogsResponseSchema,
} from './logSchema';

export const RegisterLog = (registry: OpenAPIRegistry) => {
  const bearerAuth = registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });

  registry.registerPath({
    method: 'post',
    path: '/logs',
    description: '',
    summary: '',
    security: [{ [bearerAuth.name]: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateLogRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: '',
        content: {
          'application/json': {
            schema: CreateLogResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/logs',
    description: '',
    summary: '',
    security: [{ [bearerAuth.name]: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: GetAllLogsRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: '',
        content: {
          'application/json': {
            schema: GetAllLogsResponseSchema,
          },
        },
      },
    },
  });
};
