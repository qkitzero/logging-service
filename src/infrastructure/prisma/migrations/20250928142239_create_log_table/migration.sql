-- CreateTable
CREATE TABLE "public"."Log" (
    "id" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
