-- CreateTable
CREATE TABLE `premises_fields` (
    `id` VARCHAR(191) NOT NULL,
    `value` TEXT NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `label` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
