/*
  Warnings:

  - Added the required column `TransactionFee` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TransactionId` to the `Crypto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crypto" ADD COLUMN     "TransactionFee" TEXT NOT NULL,
ADD COLUMN     "TransactionId" INTEGER NOT NULL;
