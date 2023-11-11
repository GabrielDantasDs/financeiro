-- CreateTable
CREATE TABLE `installments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ins_value` DECIMAL(6, 2) NOT NULL,
    `ins_number` INTEGER NOT NULL,
    `ins_payday` DATETIME(3) NOT NULL,
    `ins_id_financial_transacation` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `installments` ADD CONSTRAINT `installments_id_fkey` FOREIGN KEY (`id`) REFERENCES `financial_transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
