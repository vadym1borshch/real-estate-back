/*
  Warnings:

  - You are about to alter the column `livingAreaM2` on the `RealEstate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `landAreaM2` on the `RealEstate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `RealEstate` MODIFY `livingAreaM2` INTEGER NOT NULL,
    MODIFY `landAreaM2` INTEGER NULL;
