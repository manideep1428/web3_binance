/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `amount` to the `Crypto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crypto" ADD COLUMN     "amount" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "orderId" DROP DEFAULT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId");
DROP SEQUENCE "Order_orderId_seq";
