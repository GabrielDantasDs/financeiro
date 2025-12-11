/*
  Warnings:

  - You are about to drop the column `cat_name` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `id_client` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `fin_type` on the `financial_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `fin_value` on the `financial_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `supplier` table. All the data in the column will be lost.
  - Added the required column `name` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `financial_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `financial_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `cat_name`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `district`,
    DROP COLUMN `id_client`,
    ADD COLUMN `neighborhood` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `financial_transaction` DROP COLUMN `fin_type`,
    DROP COLUMN `fin_value`,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    ADD COLUMN `value` DECIMAL(6, 2) NOT NULL;

-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `district`,
    ADD COLUMN `neighborhood` VARCHAR(191) NOT NULL;
