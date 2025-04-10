/*
  Warnings:

  - You are about to drop the column `certificateUrl` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the column `captions` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `discountPrice` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `previewVideo` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `totalLessons` on the `courses` table. All the data in the column will be lost.
  - You are about to alter the column `level` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - You are about to drop the column `isClosed` on the `discussions` table. All the data in the column will be lost.
  - You are about to drop the column `isPinned` on the `discussions` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `discussions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `discussions` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `isPreview` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `quizId` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `lessons` table. All the data in the column will be lost.
  - You are about to alter the column `videoUrl` on the `lessons` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the column `createdAt` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `answers` on the `quiz_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `quiz_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `isPassed` on the `quiz_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `timeSpent` on the `quiz_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `quizzes` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `quizzes` table. All the data in the column will be lost.
  - You are about to drop the column `passingScore` on the `quizzes` table. All the data in the column will be lost.
  - You are about to drop the column `timeLimit` on the `quizzes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `quizzes` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `avatar` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `verificationToken` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `resetToken` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the `course_enrollments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_outcomes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_requirements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `discussion_replies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lesson_resources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `password_reset_tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quiz_questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,quizId]` on the table `quiz_attempts` will be added. If there are existing duplicate values, this will fail.
  - Made the column `content` on table `lessons` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `certificates_courseId_idx` ON `certificates`;

-- DropIndex
DROP INDEX `certificates_issuedAt_idx` ON `certificates`;

-- DropIndex
DROP INDEX `certificates_userId_idx` ON `certificates`;

-- DropIndex
DROP INDEX `certificates_verificationCode_key` ON `certificates`;

-- DropIndex
DROP INDEX `courses_category_idx` ON `courses`;

-- DropIndex
DROP INDEX `courses_createdAt_idx` ON `courses`;

-- DropIndex
DROP INDEX `courses_instructorId_idx` ON `courses`;

-- DropIndex
DROP INDEX `courses_isDeleted_idx` ON `courses`;

-- DropIndex
DROP INDEX `courses_level_idx` ON `courses`;

-- DropIndex
DROP INDEX `courses_publishedAt_idx` ON `courses`;

-- DropIndex
DROP INDEX `courses_slug_key` ON `courses`;

-- DropIndex
DROP INDEX `courses_status_idx` ON `courses`;

-- DropIndex
DROP INDEX `discussions_courseId_idx` ON `discussions`;

-- DropIndex
DROP INDEX `discussions_createdAt_idx` ON `discussions`;

-- DropIndex
DROP INDEX `discussions_isClosed_idx` ON `discussions`;

-- DropIndex
DROP INDEX `discussions_isPinned_idx` ON `discussions`;

-- DropIndex
DROP INDEX `discussions_userId_idx` ON `discussions`;

-- DropIndex
DROP INDEX `lessons_duration_idx` ON `lessons`;

-- DropIndex
DROP INDEX `lessons_isPreview_idx` ON `lessons`;

-- DropIndex
DROP INDEX `lessons_moduleId_idx` ON `lessons`;

-- DropIndex
DROP INDEX `lessons_order_idx` ON `lessons`;

-- DropIndex
DROP INDEX `lessons_quizId_key` ON `lessons`;

-- DropIndex
DROP INDEX `modules_courseId_idx` ON `modules`;

-- DropIndex
DROP INDEX `modules_duration_idx` ON `modules`;

-- DropIndex
DROP INDEX `modules_order_idx` ON `modules`;

-- DropIndex
DROP INDEX `quiz_attempts_completedAt_idx` ON `quiz_attempts`;

-- DropIndex
DROP INDEX `quiz_attempts_isPassed_idx` ON `quiz_attempts`;

-- DropIndex
DROP INDEX `quiz_attempts_quizId_idx` ON `quiz_attempts`;

-- DropIndex
DROP INDEX `quiz_attempts_timeSpent_idx` ON `quiz_attempts`;

-- DropIndex
DROP INDEX `quiz_attempts_userId_idx` ON `quiz_attempts`;

-- DropIndex
DROP INDEX `quizzes_courseId_idx` ON `quizzes`;

-- DropIndex
DROP INDEX `quizzes_lessonId_idx` ON `quizzes`;

-- DropIndex
DROP INDEX `quizzes_lessonId_key` ON `quizzes`;

-- DropIndex
DROP INDEX `quizzes_passingScore_idx` ON `quizzes`;

-- DropIndex
DROP INDEX `quizzes_timeLimit_idx` ON `quizzes`;

-- DropIndex
DROP INDEX `users_deletedAt_idx` ON `users`;

-- DropIndex
DROP INDEX `users_email_idx` ON `users`;

-- DropIndex
DROP INDEX `users_lastLogin_idx` ON `users`;

-- DropIndex
DROP INDEX `users_role_idx` ON `users`;

-- AlterTable
ALTER TABLE `certificates` DROP COLUMN `certificateUrl`,
    DROP COLUMN `verificationCode`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `captions`,
    DROP COLUMN `category`,
    DROP COLUMN `discountPrice`,
    DROP COLUMN `duration`,
    DROP COLUMN `image`,
    DROP COLUMN `isDeleted`,
    DROP COLUMN `language`,
    DROP COLUMN `previewVideo`,
    DROP COLUMN `publishedAt`,
    DROP COLUMN `shortDescription`,
    DROP COLUMN `slug`,
    DROP COLUMN `status`,
    DROP COLUMN `totalLessons`,
    ADD COLUMN `tags` VARCHAR(191) NULL,
    ADD COLUMN `thumbnail` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `level` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `discussions` DROP COLUMN `isClosed`,
    DROP COLUMN `isPinned`,
    DROP COLUMN `title`,
    DROP COLUMN `updatedAt`,
    MODIFY `content` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `lessons` DROP COLUMN `duration`,
    DROP COLUMN `isPreview`,
    DROP COLUMN `order`,
    DROP COLUMN `quizId`,
    DROP COLUMN `updatedAt`,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `content` VARCHAR(191) NOT NULL,
    MODIFY `videoUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `modules` DROP COLUMN `createdAt`,
    DROP COLUMN `description`,
    DROP COLUMN `duration`,
    DROP COLUMN `order`,
    DROP COLUMN `updatedAt`,
    MODIFY `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `quiz_attempts` DROP COLUMN `answers`,
    DROP COLUMN `completedAt`,
    DROP COLUMN `isPassed`,
    DROP COLUMN `timeSpent`,
    ADD COLUMN `attemptedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `score` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `quizzes` DROP COLUMN `createdAt`,
    DROP COLUMN `lessonId`,
    DROP COLUMN `passingScore`,
    DROP COLUMN `timeLimit`,
    DROP COLUMN `updatedAt`,
    MODIFY `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NULL,
    MODIFY `avatar` VARCHAR(191) NULL,
    MODIFY `bio` VARCHAR(191) NULL,
    MODIFY `verificationToken` VARCHAR(191) NULL,
    MODIFY `resetToken` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `course_enrollments`;

-- DropTable
DROP TABLE `course_outcomes`;

-- DropTable
DROP TABLE `course_requirements`;

-- DropTable
DROP TABLE `course_reviews`;

-- DropTable
DROP TABLE `discussion_replies`;

-- DropTable
DROP TABLE `lesson_resources`;

-- DropTable
DROP TABLE `password_reset_tokens`;

-- DropTable
DROP TABLE `quiz_questions`;

-- DropTable
DROP TABLE `user_progress`;

-- DropTable
DROP TABLE `verification_tokens`;

-- CreateTable
CREATE TABLE `enrollments` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `enrolledAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `enrollments_userId_courseId_key`(`userId`, `courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `progress` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `lessonId` VARCHAR(191) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `progress_userId_lessonId_key`(`userId`, `lessonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `id` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `options` VARCHAR(191) NULL,
    `answer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` VARCHAR(191) NOT NULL,
    `discussionId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `quiz_attempts_userId_quizId_key` ON `quiz_attempts`(`userId`, `quizId`);

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `modules` ADD CONSTRAINT `modules_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `modules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `progress` ADD CONSTRAINT `progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `progress` ADD CONSTRAINT `progress_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `lessons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quizzes` ADD CONSTRAINT `quizzes_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `quizzes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz_attempts` ADD CONSTRAINT `quiz_attempts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz_attempts` ADD CONSTRAINT `quiz_attempts_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `quizzes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `discussions` ADD CONSTRAINT `discussions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `discussions` ADD CONSTRAINT `discussions_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_discussionId_fkey` FOREIGN KEY (`discussionId`) REFERENCES `discussions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
