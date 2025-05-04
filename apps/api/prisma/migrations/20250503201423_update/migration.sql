/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ProductGrading" AS ENUM ('FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE');

-- AlterEnum
ALTER TYPE "BillingCycle" ADD VALUE 'ONE_TIME';

-- AlterEnum
ALTER TYPE "LoginHistoryStatus" ADD VALUE 'LOCKED';

-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'REFUNDED';

-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'REFUNDED';

-- DropIndex
DROP INDEX "User_email_createdAt_idx";

-- AlterTable
ALTER TABLE "LoginHistory" ADD COLUMN     "country" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "currency" TEXT,
ADD COLUMN     "discount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "subtotal" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "tax" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "transId" TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "grade" "ProductGrading",
ADD COLUMN     "quantity" INTEGER DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_status_username_createdAt_idx" ON "User"("email", "status", "username", "createdAt");
