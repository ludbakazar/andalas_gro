-- CreateTable
CREATE TABLE "public"."SalesOrders" (
    "id" SERIAL NOT NULL,
    "invNumber" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "total" DECIMAL(20,2) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SalesOrdersItems" (
    "salesOrderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "basicPrice" DECIMAL(20,2) NOT NULL,
    "sellingPrice" DECIMAL(20,2) NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesOrdersItems_pkey" PRIMARY KEY ("productId","salesOrderId")
);

-- AddForeignKey
ALTER TABLE "public"."SalesOrders" ADD CONSTRAINT "SalesOrders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SalesOrdersItems" ADD CONSTRAINT "SalesOrdersItems_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "public"."SalesOrders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SalesOrdersItems" ADD CONSTRAINT "SalesOrdersItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
