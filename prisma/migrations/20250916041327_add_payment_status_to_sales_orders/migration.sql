/*
  Warnings:

  - Added the required column `paymentStatus` to the `SalesOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."SalesOrders" ADD COLUMN     "paymentStatus" TEXT NOT NULL;
