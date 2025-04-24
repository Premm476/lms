/*
  Warnings:

  - You are about to drop the `examresult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `examsession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `examresult` DROP FOREIGN KEY `ExamResult_examSessionId_fkey`;

-- AlterTable
ALTER TABLE `quiz_attempts` ADD COLUMN `passed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `prize` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `examresult`;

-- DropTable
DROP TABLE `examsession`;

-- CreateTable
CREATE TABLE `exam_sessions` (
    `sessionId` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `college` VARCHAR(191) NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`sessionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_results` (
    `id` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `timeTaken` INTEGER NOT NULL,
    `passed` BOOLEAN NOT NULL DEFAULT false,
    `examSessionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exam_sessions` ADD CONSTRAINT `exam_sessions_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `quizzes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_results` ADD CONSTRAINT `exam_results_examSessionId_fkey` FOREIGN KEY (`examSessionId`) REFERENCES `exam_sessions`(`sessionId`) ON DELETE RESTRICT ON UPDATE CASCADE;
