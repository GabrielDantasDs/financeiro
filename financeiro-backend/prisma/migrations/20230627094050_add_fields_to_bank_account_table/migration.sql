/*
  Warnings:

  - Added the required column `bac_date_inicial_value` to the `bank_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bac_inicial_value` to the `bank_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bac_institution` to the `bank_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bank_account` ADD COLUMN `bac_date_inicial_value` DATETIME(3) NOT NULL,
    ADD COLUMN `bac_inicial_value` DECIMAL(6, 2) NOT NULL,
    ADD COLUMN `bac_institution` VARCHAR(191) NOT NULL;
