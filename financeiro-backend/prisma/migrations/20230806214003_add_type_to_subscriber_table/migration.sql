/*
  Warnings:

  - Added the required column `sub_type` to the `subscriber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subscriber` ADD COLUMN `sub_type` VARCHAR(191) NOT NULL;
