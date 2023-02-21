/*
  Warnings:

  - You are about to drop the column `documento` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Cliente` table. All the data in the column will be lost.
  - Added the required column `cus_address` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cus_city` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cus_district` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cus_documento` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cus_email` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cus_name` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cus_number` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cus_phone` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cus_state` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cliente` DROP COLUMN `documento`,
    DROP COLUMN `email`,
    DROP COLUMN `nome`,
    DROP COLUMN `telefone`,
    ADD COLUMN `cus_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `cus_city` VARCHAR(191) NOT NULL,
    ADD COLUMN `cus_district` VARCHAR(191) NOT NULL,
    ADD COLUMN `cus_documento` VARCHAR(191) NOT NULL,
    ADD COLUMN `cus_email` VARCHAR(191) NOT NULL,
    ADD COLUMN `cus_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `cus_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `cus_phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `cus_state` VARCHAR(191) NOT NULL;
