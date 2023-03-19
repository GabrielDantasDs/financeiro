/*
  Warnings:

  - You are about to drop the column `fin_category` on the `FinancialTransactions` table. All the data in the column will be lost.
  - Added the required column `fin_category_id` to the `FinancialTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FinancialTransactions` DROP COLUMN `fin_category`,
    ADD COLUMN `fin_category_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cat_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FinancialTransactions` ADD CONSTRAINT `FinancialTransactions_fin_category_id_fkey` FOREIGN KEY (`fin_category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
