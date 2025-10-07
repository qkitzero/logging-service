prisma-generate:
	npx prisma generate --schema=src/infrastructure/prisma/schema.prisma

prisma-reset:
	npx prisma migrate reset --schema=src/infrastructure/prisma/schema.prisma

migrate-up:
	npx prisma migrate dev --schema=src/infrastructure/prisma/schema.prisma

migrate-create:
	npx prisma migrate dev --schema=src/infrastructure/prisma/schema.prisma --name $(name)