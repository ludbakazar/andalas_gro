-- CreateTable
CREATE TABLE "public"."Products" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "basicPrice" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdByUserId" INTEGER NOT NULL,
    "updatedByUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PurchasesOrders" (
    "id" SERIAL NOT NULL,
    "invNumber" TEXT NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "invoiceStatus" TEXT NOT NULL,
    "total" BIGINT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchasesOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PurchasesOrdersItems" (
    "purchaseOrderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "basicPrice" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchasesOrdersItems_pkey" PRIMARY KEY ("productId","purchaseOrderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PurchasesOrders_supplierId_key" ON "public"."PurchasesOrders"("supplierId");

-- AddForeignKey
ALTER TABLE "public"."PurchasesOrders" ADD CONSTRAINT "PurchasesOrders_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PurchasesOrdersItems" ADD CONSTRAINT "PurchasesOrdersItems_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "public"."PurchasesOrders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PurchasesOrdersItems" ADD CONSTRAINT "PurchasesOrdersItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
