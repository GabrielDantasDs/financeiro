/*
  Warnings:

  - You are about to drop the column `coc_id_category` on the `cost_center` table. All the data in the column will be lost.
  - You are about to alter the column `fin_periodicity_type` on the `financial_transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `cat_id_cost_center` INTEGER NULL;

-- AlterTable
ALTER TABLE `cost_center` DROP COLUMN `coc_id_category`;

-- AlterTable
ALTER TABLE `financial_transaction` MODIFY `fin_periodicity_type` ENUM('UNICA', 'DIARIA', 'SEMANAL', 'QUINZENAL', 'MENSAL', 'BIMESTRAL', 'SEMESTRAL', 'ANUAL') NOT NULL DEFAULT 'UNICA';

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_cat_id_cost_center_fkey` FOREIGN KEY (`cat_id_cost_center`) REFERENCES `cost_center`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
