/*
  Warnings:

  - Added the required column `fin_id_bank_account` to the `financial_transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `financial_transaction` ADD COLUMN `fin_id_bank_account` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `financial_transaction` ADD CONSTRAINT `financial_transaction_fin_id_bank_account_fkey` FOREIGN KEY (`fin_id_bank_account`) REFERENCES `bank_account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
