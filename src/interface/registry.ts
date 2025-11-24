import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';
import * as fs from 'fs';
import { z } from 'zod';
import { RegisterLog } from './logRegistry';

extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

RegisterLog(registry);

function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '0.0.0',
      title: 'Logging Service',
      description: 'Microservices for logging',
    },
    servers: [{ url: 'v1' }],
  });
}

function writeDocumentation() {
  const docs = getOpenApiDocumentation();

  const fileContent = JSON.stringify(docs);

  fs.writeFileSync(`${__dirname}/openapi.json`, fileContent, {
    encoding: 'utf-8',
  });
}

writeDocumentation();
