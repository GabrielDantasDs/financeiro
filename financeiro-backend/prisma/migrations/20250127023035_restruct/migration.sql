/*
  Warnings:

  - You are about to drop the column `payment_day` on the `financial_transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `financial_transaction` DROP COLUMN `payment_day`,
    ADD COLUMN `due_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `number_installments` INTEGER NULL,
    ADD COLUMN `payment_date` DATETIME(3) NULL,
    ADD COLUMN `recurrencies` INTEGER NULL;

-- CreateTable
CREATE TABLE `installments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `financial_transaction_id` INTEGER NOT NULL,
    `value` DECIMAL(6, 2) NOT NULL,
    `due_date` DATETIME(3) NOT NULL,
    `invoice_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `payment_date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recurring_financial_transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `financial_transaction_id` INTEGER NOT NULL,
    `recurrence_in_days` INTEGER NOT NULL,
    `original_date` DATETIME(3) NOT NULL,
    `current_date` DATETIME(3) NULL,
    `next_date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE FULLTEXT INDEX `financial_transaction_note_idx` ON `financial_transaction`(`note`);

-- AddForeignKey
ALTER TABLE `installments` ADD CONSTRAINT `installments_financial_transaction_id_fkey` FOREIGN KEY (`financial_transaction_id`) REFERENCES `financial_transaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
