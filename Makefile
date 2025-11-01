prisma-generate:
	npx prisma generate --schema=src/infrastructure/prisma/schema.prisma

migrate-create:
	npx prisma migrate dev --schema=src/infrastructure/prisma/schema.prisma --name $(name)

migrate-deploy:
	npx prisma migrate deploy --schema=src/infrastructure/prisma/schema.prisma

migrate-reset:
	npx prisma migrate reset --schema=src/infrastructure/prisma/schema.prisma