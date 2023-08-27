/*
  Warnings:

  - The values [DIARIA,SEMANAL,QUINZENAL,MENSAL,BIMESTRAL,SEMESTRAL,ANUAL] on the enum `financial_transaction_fin_periodicity_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `financial_transaction` MODIFY `fin_periodicity_type` ENUM('UNICA', 'RECORRENTE') NOT NULL DEFAULT 'UNICA';
