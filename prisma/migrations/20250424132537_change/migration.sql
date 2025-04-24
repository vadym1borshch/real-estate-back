/*
  Warnings:

  - You are about to drop the column `descriptions` on the `RealEstateEquipments` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `RealEstateEquipments` table. All the data in the column will be lost.
  - You are about to drop the column `descriptions` on the `RealEstatePremises` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `RealEstatePremises` table. All the data in the column will be lost.
  - Added the required column `key` to the `RealEstateEquipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `RealEstateEquipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `RealEstateEquipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `RealEstateFees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `RealEstateFees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `RealEstateMonthlyCosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `RealEstateMonthlyCosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `RealEstatePremises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `RealEstatePremises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `RealEstatePremises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RealEstateEquipments` DROP COLUMN `descriptions`,
    DROP COLUMN `title`,
    ADD COLUMN `key` VARCHAR(191) NOT NULL,
    ADD COLUMN `label` TEXT NOT NULL,
    ADD COLUMN `value` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `RealEstateFees` ADD COLUMN `key` VARCHAR(191) NOT NULL,
    ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `RealEstateMonthlyCosts` ADD COLUMN `cost` VARCHAR(191) NOT NULL,
    ADD COLUMN `key` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `RealEstatePremises` DROP COLUMN `descriptions`,
    DROP COLUMN `title`,
    ADD COLUMN `key` VARCHAR(191) NOT NULL,
    ADD COLUMN `label` TEXT NOT NULL,
    ADD COLUMN `name` TEXT NOT NULL,
    MODIFY `value` TEXT NOT NULL;
