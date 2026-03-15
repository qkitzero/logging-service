FROM node:24-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN --mount=type=secret,id=npmrc,target=.npmrc npm ci
COPY . .
RUN npx prisma generate --schema=src/infrastructure/prisma/schema.prisma
RUN npm run build
RUN npm prune --production
RUN rm -rf node_modules/@prisma/engines \
       node_modules/@prisma/engines-version \
       node_modules/@prisma/fetch-engine \
       node_modules/@prisma/get-platform
RUN find node_modules/@prisma/client/runtime \
       \( -name "*.cockroachdb.*" \
       -o -name "*.mysql.*" \
       -o -name "*.sqlite.*" \
       -o -name "*.sqlserver.*" \
       -o -name "*.map" \
       -o -name "binary.*" \
       -o -name "edge*" \
       -o -name "wasm*" \
       -o -name "react-native.*" \
       -o -name "index-browser.*" \) -delete

FROM node:24-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
CMD [ "node", "dist/server.js" ]