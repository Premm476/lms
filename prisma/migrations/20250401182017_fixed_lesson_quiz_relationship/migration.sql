/*
  Warnings:

  - You are about to alter the column `verificationCode` on the `certificates` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `paymentId` on the `course_enrollments` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `title` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `slug` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `language` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `lesson_resources` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `type` on the `lesson_resources` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `title` on the `lessons` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `title` on the `modules` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - The `emailVerified` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[quizId]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `certificates` MODIFY `certificateUrl` VARCHAR(255) NOT NULL,
    MODIFY `verificationCode` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `course_enrollments` MODIFY `paymentId` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `course_outcomes` MODIFY `text` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `course_requirements` MODIFY `text` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `course_reviews` MODIFY `content` TEXT NULL;

-- AlterTable
ALTER TABLE `courses` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `title` VARCHAR(150) NOT NULL,
    MODIFY `slug` VARCHAR(150) NOT NULL,
    MODIFY `description` TEXT NOT NULL,
    MODIFY `image` VARCHAR(255) NULL,
    MODIFY `previewVideo` VARCHAR(255) NULL,
    MODIFY `language` VARCHAR(50) NULL DEFAULT 'English';

-- AlterTable
ALTER TABLE `lesson_resources` MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `url` VARCHAR(255) NOT NULL,
    MODIFY `type` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `lessons` ADD COLUMN `quizId` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(150) NOT NULL,
    MODIFY `content` TEXT NULL,
    MODIFY `videoUrl` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `modules` MODIFY `title` VARCHAR(100) NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `agreedToTerms` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `role` ENUM('STUDENT', 'INSTRUCTOR', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    MODIFY `avatar` VARCHAR(255) NULL,
    MODIFY `bio` TEXT NULL,
    DROP COLUMN `emailVerified`,
    ADD COLUMN `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `verificationToken` VARCHAR(255) NULL,
    MODIFY `resetToken` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `verification_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `verification_tokens_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_reset_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `password_reset_tokens_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discussions` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,

    INDEX `discussions_userId_idx`(`userId`),
    INDEX `discussions_courseId_idx`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discussion_replies` (
    `id` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `discussionId` VARCHAR(191) NOT NULL,

    INDEX `discussion_replies_userId_idx`(`userId`),
    INDEX `discussion_replies_discussionId_idx`(`discussionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quizzes` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `passingScore` INTEGER NOT NULL DEFAULT 70,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lessonId` VARCHAR(191) NULL,
    `courseId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `quizzes_lessonId_key`(`lessonId`),
    INDEX `quizzes_courseId_idx`(`courseId`),
    INDEX `quizzes_lessonId_idx`(`lessonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quiz_questions` (
    `id` VARCHAR(191) NOT NULL,
    `question` TEXT NOT NULL,
    `options` JSON NOT NULL,
    `correctAnswer` INTEGER NOT NULL,
    `explanation` TEXT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `quizId` VARCHAR(191) NOT NULL,

    INDEX `quiz_questions_quizId_idx`(`quizId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quiz_attempts` (
    `id` VARCHAR(191) NOT NULL,
    `score` DOUBLE NOT NULL,
    `completedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `answers` JSON NOT NULL,
    `isPassed` BOOLEAN NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,

    INDEX `quiz_attempts_userId_idx`(`userId`),
    INDEX `quiz_attempts_quizId_idx`(`quizId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `courses_status_idx` ON `courses`(`status`);

-- CreateIndex
CREATE INDEX `courses_created_at_idx` ON `courses`(`createdAt`);

-- CreateIndex
CREATE UNIQUE INDEX `lessons_quizId_key` ON `lessons`(`quizId`);
