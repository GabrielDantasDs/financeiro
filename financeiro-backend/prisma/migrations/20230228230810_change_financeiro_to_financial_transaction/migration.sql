/*
  Warnings:

  - You are about to drop the `Financeiro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Financeiro` DROP FOREIGN KEY `Financeiro_fin_customer_id_fkey`;

-- DropTable
DROP TABLE `Financeiro`;

-- CreateTable
CREATE TABLE `Financial_transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fin_customer_id` INTEGER NOT NULL,
    `fin_type` VARCHAR(191) NOT NULL,
    `fin_value` DECIMAL(6, 2) NOT NULL,
    `fin_category` VARCHAR(191) NOT NULL,
    `fin_note` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Financial_transaction` ADD CONSTRAINT `Financial_transaction_fin_customer_id_fkey` FOREIGN KEY (`fin_customer_id`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
