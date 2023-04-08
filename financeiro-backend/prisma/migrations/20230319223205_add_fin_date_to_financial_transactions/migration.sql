/*
  Warnings:

  - Added the required column `fin_date` to the `FinancialTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FinancialTransactions` ADD COLUMN `fin_date` DATETIME(3) NOT NULL;
