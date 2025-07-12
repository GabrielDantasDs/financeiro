/*
  Warnings:

  - Added the required column `user_id` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `financial_transaction` DROP FOREIGN KEY `financial_transaction_category_id_fkey`;

-- DropIndex
DROP INDEX `financial_transaction_category_id_fkey` ON `financial_transaction`;

-- AlterTable
ALTER TABLE `bank_account` ADD COLUMN `default` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `client` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `financial_transaction` MODIFY `category_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `client` ADD CONSTRAINT `client_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_transaction` ADD CONSTRAINT `financial_transaction_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
