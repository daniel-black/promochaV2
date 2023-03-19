-- CreateTable
CREATE TABLE "Apply" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codeId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "savings" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Apply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Apply" ADD CONSTRAINT "Apply_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "Promocode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
