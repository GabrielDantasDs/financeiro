/*
  Warnings:

  - You are about to drop the `Caixa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinancialTransactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movimentacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Caixa` DROP FOREIGN KEY `Caixa_id_cliente_fkey`;

-- DropForeignKey
ALTER TABLE `FinancialTransactions` DROP FOREIGN KEY `FinancialTransactions_fin_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `FinancialTransactions` DROP FOREIGN KEY `FinancialTransactions_fin_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `Movimentacao` DROP FOREIGN KEY `Movimentacao_id_caixa_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_id_autor_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_id_image_fkey`;

-- DropTable
DROP TABLE `Caixa`;

-- DropTable
DROP TABLE `Categories`;

-- DropTable
DROP TABLE `Cliente`;

-- DropTable
DROP TABLE `FinancialTransactions`;

-- DropTable
DROP TABLE `Image`;

-- DropTable
DROP TABLE `Movimentacao`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cli_name` VARCHAR(191) NOT NULL,
    `cli_document` VARCHAR(191) NOT NULL,
    `cli_phone` VARCHAR(191) NOT NULL,
    `cli_address` VARCHAR(191) NOT NULL,
    `cli_district` VARCHAR(191) NOT NULL,
    `cli_number` VARCHAR(191) NOT NULL,
    `cli_state` VARCHAR(191) NOT NULL,
    `cli_city` VARCHAR(191) NOT NULL,
    `cli_zip_code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub_name` VARCHAR(191) NOT NULL,
    `sub_document` VARCHAR(191) NOT NULL,
    `sub_phone` VARCHAR(191) NOT NULL,
    `sub_address` VARCHAR(191) NOT NULL,
    `sub_district` VARCHAR(191) NOT NULL,
    `sub_number` VARCHAR(191) NOT NULL,
    `sub_state` VARCHAR(191) NOT NULL,
    `sub_city` VARCHAR(191) NOT NULL,
    `sub_zip_code` VARCHAR(191) NOT NULL,
    `sub_id_client` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriber_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sut_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `financial_transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fin_id_client` INTEGER NOT NULL,
    `fin_type` VARCHAR(191) NOT NULL,
    `fin_value` DECIMAL(6, 2) NOT NULL,
    `fin_id_category` INTEGER NOT NULL,
    `fin_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fin_note` VARCHAR(191) NULL,
    `subscriberId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cat_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cost_center` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coc_id_category` INTEGER NOT NULL,
    `coc_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_condition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pac_installment` INTEGER NOT NULL,
    `pac_method` VARCHAR(191) NOT NULL,
    `pac_id_bank_account` INTEGER NOT NULL,
    `pac_paid` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bank_account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bac_name` VARCHAR(191) NOT NULL,
    `bac_type` VARCHAR(191) NOT NULL,
    `bac_description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subscriber` ADD CONSTRAINT `subscriber_sub_id_client_fkey` FOREIGN KEY (`sub_id_client`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_transaction` ADD CONSTRAINT `financial_transaction_fin_id_client_fkey` FOREIGN KEY (`fin_id_client`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_transaction` ADD CONSTRAINT `financial_transaction_fin_id_category_fkey` FOREIGN KEY (`fin_id_category`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_transaction` ADD CONSTRAINT `financial_transaction_subscriberId_fkey` FOREIGN KEY (`subscriberId`) REFERENCES `subscriber`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_condition` ADD CONSTRAINT `payment_condition_pac_id_bank_account_fkey` FOREIGN KEY (`pac_id_bank_account`) REFERENCES `bank_account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
