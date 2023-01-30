/*
  Warnings:

  - Added the required column `userId` to the `Inputs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Outputs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inputs" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Outputs" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Inputs" ADD CONSTRAINT "Inputs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outputs" ADD CONSTRAINT "Outputs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
