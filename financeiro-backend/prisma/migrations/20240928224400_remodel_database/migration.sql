/*
  Warnings:

  - You are about to drop the column `cost_center_id` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `cost_center` table. All the data in the column will be lost.
  - You are about to drop the column `id_client` on the `supplier` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `cost_center` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bank_account` DROP FOREIGN KEY `bank_account_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_cost_center_id_fkey`;

-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `customer_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `financial_transaction` DROP FOREIGN KEY `financial_transaction_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier` DROP FOREIGN KEY `supplier_client_id_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `cost_center_id`,
    ADD COLUMN `client_id` INTEGER NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cost_center` DROP COLUMN `type`,
    ADD COLUMN `category_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `financial_transaction` ADD COLUMN `cost_center_id` INTEGER NULL,
    ADD COLUMN `subscription_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `client_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `id_client`,
    MODIFY `neighborhood` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_transaction` ADD CONSTRAINT `financial_transaction_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_transaction` ADD CONSTRAINT `financial_transaction_cost_center_id_fkey` FOREIGN KEY (`cost_center_id`) REFERENCES `cost_center`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_transaction` ADD CONSTRAINT `financial_transaction_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `subscription_customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cost_center` ADD CONSTRAINT `cost_center_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bank_account` ADD CONSTRAINT `bank_account_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier` ADD CONSTRAINT `supplier_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
