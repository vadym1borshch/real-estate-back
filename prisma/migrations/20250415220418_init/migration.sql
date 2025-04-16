-- AlterTable
ALTER TABLE `RealEstate` ADD COLUMN `number` INTEGER NULL,
    ADD COLUMN `rentFormation` VARCHAR(191) NULL,
    ADD COLUMN `street` VARCHAR(191) NULL,
    ADD COLUMN `visibleDetailedAddress` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `RealEstatePremises` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `descriptions` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `realEstateId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RealEstateEquipments` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `descriptions` VARCHAR(191) NOT NULL,
    `realEstateId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RealEstateFees` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `descriptions` VARCHAR(191) NOT NULL,
    `realEstateId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RealEstateMonthlyCosts` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `descriptions` VARCHAR(191) NOT NULL,
    `realEstateId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RealEstatePremises` ADD CONSTRAINT `RealEstatePremises_realEstateId_fkey` FOREIGN KEY (`realEstateId`) REFERENCES `RealEstate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RealEstateEquipments` ADD CONSTRAINT `RealEstateEquipments_realEstateId_fkey` FOREIGN KEY (`realEstateId`) REFERENCES `RealEstate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RealEstateFees` ADD CONSTRAINT `RealEstateFees_realEstateId_fkey` FOREIGN KEY (`realEstateId`) REFERENCES `RealEstate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RealEstateMonthlyCosts` ADD CONSTRAINT `RealEstateMonthlyCosts_realEstateId_fkey` FOREIGN KEY (`realEstateId`) REFERENCES `RealEstate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
