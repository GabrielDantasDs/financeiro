/*
  Warnings:

  - You are about to drop the column `fin_date` on the `financial_transaction` table. All the data in the column will be lost.
  - Added the required column `fin_id_center_cost` to the `financial_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fin_payed` to the `financial_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fin_payment_day` to the `financial_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fin_periodicity` to the `financial_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fin_periodicity_type` to the `financial_transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `financial_transaction` DROP COLUMN `fin_date`,
    ADD COLUMN `fin_id_center_cost` INTEGER NOT NULL,
    ADD COLUMN `fin_invoice_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `fin_payed` BOOLEAN NOT NULL,
    ADD COLUMN `fin_payment_day` DATETIME(3) NOT NULL,
    ADD COLUMN `fin_periodicity` INTEGER NOT NULL,
    ADD COLUMN `fin_periodicity_type` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `financial_transaction` ADD CONSTRAINT `financial_transaction_fin_id_center_cost_fkey` FOREIGN KEY (`fin_id_center_cost`) REFERENCES `cost_center`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
