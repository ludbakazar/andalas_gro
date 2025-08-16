-- CreateTable
CREATE TABLE "public"."SupplierDebts" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "debtAmount" DOUBLE PRECISION NOT NULL,
    "claimAmount" DOUBLE PRECISION NOT NULL,
    "debtPaid" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SupplierDebts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SupplierDebts_supplierId_key" ON "public"."SupplierDebts"("supplierId");

-- AddForeignKey
ALTER TABLE "public"."SupplierDebts" ADD CONSTRAINT "SupplierDebts_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
