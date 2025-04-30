-- CreateEnum
CREATE TYPE "LoginHistoryStatus" AS ENUM ('SUCCESS', 'FAILED');

-- DropForeignKey
ALTER TABLE "LoginHistory" DROP CONSTRAINT "LoginHistory_userId_fkey";

-- AlterTable
ALTER TABLE "LoginHistory" ADD COLUMN     "attempt" "LoginHistoryStatus" NOT NULL DEFAULT 'SUCCESS';

-- AddForeignKey
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
