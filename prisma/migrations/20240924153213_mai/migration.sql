/*
  Warnings:

  - Made the column `soldAt` on table `Crypto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Crypto" ALTER COLUMN "soldAt" SET NOT NULL;
