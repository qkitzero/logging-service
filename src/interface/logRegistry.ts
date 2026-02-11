import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import {
  CreateLogRequestSchema,
  CreateLogResponseSchema,
  ErrorResponseSchema,
  GetAllLogsResponseSchema,
} from './logSchema';

export const registerLog = (registry: OpenAPIRegistry) => {
  const bearerAuth = registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });

  const errorResponses = {
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  };

  registry.registerPath({
    method: 'post',
    path: '/v1/logs',
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
      ...errorResponses,
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/v1/logs',
    description: '',
    summary: '',
    security: [{ [bearerAuth.name]: [] }],
    responses: {
      200: {
        description: '',
        content: {
          'application/json': {
            schema: GetAllLogsResponseSchema,
          },
        },
      },
      ...errorResponses,
    },
  });
};
