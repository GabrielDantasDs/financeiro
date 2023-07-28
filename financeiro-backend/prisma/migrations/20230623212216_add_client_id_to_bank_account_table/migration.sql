/*
  Warnings:

  - Added the required column `bac_id_client` to the `bank_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bank_account` ADD COLUMN `bac_id_client` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `bank_account` ADD CONSTRAINT `bank_account_bac_id_client_fkey` FOREIGN KEY (`bac_id_client`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
