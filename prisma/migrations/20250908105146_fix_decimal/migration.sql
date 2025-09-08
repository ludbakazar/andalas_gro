/*
  Warnings:

  - You are about to alter the column `total` on the `PurchasesOrders` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(20,2)`.
  - You are about to alter the column `debtAmount` on the `SupplierDebts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(20,2)`.
  - You are about to alter the column `claimAmount` on the `SupplierDebts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(20,2)`.
  - You are about to alter the column `debtPaid` on the `SupplierDebts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(20,2)`.

*/
-- AlterTable
ALTER TABLE "public"."PurchasesOrders" ALTER COLUMN "total" SET DATA TYPE DECIMAL(20,2);

-- AlterTable
ALTER TABLE "public"."SupplierDebts" ALTER COLUMN "debtAmount" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "claimAmount" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "debtPaid" SET DATA TYPE DECIMAL(20,2);
