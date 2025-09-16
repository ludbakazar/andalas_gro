/*
  Warnings:

  - Added the required column `basicPrice` to the `SalesOrdersItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."SalesOrdersItems" ADD COLUMN     "basicPrice" DECIMAL(20,2) NOT NULL;
