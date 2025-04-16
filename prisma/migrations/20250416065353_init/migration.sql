-- AlterTable
ALTER TABLE `RealEstate` ADD COLUMN `status` ENUM('active', 'inactive', 'moderation', 'rejected') NOT NULL DEFAULT 'moderation';
