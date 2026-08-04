-- Remove authentication-owned relationships before dropping auth tables.
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";
ALTER TABLE "Job" DROP CONSTRAINT "Job_PostedById_fkey";

DROP INDEX "Application_jobId_userId_key";

ALTER TABLE "Application" DROP COLUMN "userId";
ALTER TABLE "Job" DROP COLUMN "PostedById";
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'PENDING';
UPDATE "Application" SET "status" = 'PENDING' WHERE "status" = 'PEDNING';

DROP TABLE "accounts";
DROP TABLE "sessions";
DROP TABLE "verification_tokens";
DROP TABLE "users";
