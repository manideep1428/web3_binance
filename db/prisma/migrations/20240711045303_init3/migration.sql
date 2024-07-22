-- AlterTable
CREATE SEQUENCE crypto_transactionid_seq;
ALTER TABLE "Crypto" ALTER COLUMN "buyAt" SET DATA TYPE TEXT,
ALTER COLUMN "SoldAt" DROP NOT NULL,
ALTER COLUMN "SoldAt" SET DATA TYPE TEXT,
ALTER COLUMN "TimeSoldAt" DROP NOT NULL,
ALTER COLUMN "TransactionId" SET DEFAULT nextval('crypto_transactionid_seq');
ALTER SEQUENCE crypto_transactionid_seq OWNED BY "Crypto"."TransactionId";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "amount" SET DATA TYPE TEXT,
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT;
