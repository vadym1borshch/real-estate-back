/*
  Warnings:

  - You are about to drop the column `favorite` on the `RealEstate` table. All the data in the column will be lost.
  - You are about to drop the column `selectedOnMap` on the `RealEstate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `RealEstate` DROP COLUMN `favorite`,
    DROP COLUMN `selectedOnMap`,
    ADD COLUMN `HBW` VARCHAR(191) NULL,
    ADD COLUMN `HBWEnergyClass` VARCHAR(191) NULL,
    ADD COLUMN `balcony` VARCHAR(191) NULL,
    ADD COLUMN `brokerCommissions` VARCHAR(191) NULL,
    ADD COLUMN `brokerCommissionsPercentage` VARCHAR(191) NULL,
    ADD COLUMN `cellar` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `energyCertificate` VARCHAR(191) NULL,
    ADD COLUMN `fGEE` VARCHAR(191) NULL,
    ADD COLUMN `fGEEEnergyClass` VARCHAR(191) NULL,
    ADD COLUMN `garden` VARCHAR(191) NULL,
    ADD COLUMN `isFavorite` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isSelectedOnMap` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `locationDescriptions` TEXT NULL,
    ADD COLUMN `netOperationCosts` VARCHAR(191) NULL,
    ADD COLUMN `parkPlacePrice` VARCHAR(191) NULL,
    ADD COLUMN `propertyDescriptions` TEXT NULL,
    ADD COLUMN `terrace` VARCHAR(191) NULL,
    MODIFY `bathroomsDesc` TEXT NULL,
    MODIFY `additionalFeatures` TEXT NULL,
    MODIFY `number` VARCHAR(191) NULL;
