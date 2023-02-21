-- AlterTable
ALTER TABLE `User` DROP COLUMN `password`;

-- CreateIndex
CREATE INDEX `Post_authorId_fkey` ON `Post`(`authorId` ASC);

