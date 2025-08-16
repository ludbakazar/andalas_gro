/*
  Warnings:

  - You are about to alter the column `debtAmount` on the `SupplierDebts` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `claimAmount` on the `SupplierDebts` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `debtPaid` on the `SupplierDebts` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "public"."SupplierDebts" ALTER COLUMN "debtAmount" SET DATA TYPE BIGINT,
ALTER COLUMN "claimAmount" SET DATA TYPE BIGINT,
ALTER COLUMN "debtPaid" SET DATA TYPE BIGINT;
