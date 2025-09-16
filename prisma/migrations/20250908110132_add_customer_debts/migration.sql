-- CreateTable
CREATE TABLE "public"."CustomerDebts" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "debtAmount" DECIMAL(20,2) NOT NULL,
    "claimAmount" DECIMAL(20,2) NOT NULL,
    "debtPaid" DECIMAL(20,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerDebts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerDebts_customerId_key" ON "public"."CustomerDebts"("customerId");

-- AddForeignKey
ALTER TABLE "public"."CustomerDebts" ADD CONSTRAINT "CustomerDebts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
