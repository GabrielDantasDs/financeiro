/*
  Warnings:

  - Added the required column `cli_email` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `cli_email` VARCHAR(191) NOT NULL;
