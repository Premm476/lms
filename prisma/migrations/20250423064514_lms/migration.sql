-- CreateTable
CREATE TABLE `ExamResult` (
    `id` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `timeTaken` INTEGER NOT NULL,
    `examSessionId` VARCHAR(191) NOT NULL,

    INDEX `ExamResult_examSessionId_idx`(`examSessionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExamResult` ADD CONSTRAINT `ExamResult_examSessionId_fkey` FOREIGN KEY (`examSessionId`) REFERENCES `ExamSession`(`sessionId`) ON DELETE RESTRICT ON UPDATE CASCADE;
