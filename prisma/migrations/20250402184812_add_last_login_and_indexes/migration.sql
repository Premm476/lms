-- AlterTable
ALTER TABLE `discussion_replies` ADD COLUMN `isInstructorReply` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `discussions` ADD COLUMN `isClosed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isPinned` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `quiz_attempts` ADD COLUMN `timeSpent` INTEGER NULL;

-- AlterTable
ALTER TABLE `quiz_questions` ADD COLUMN `points` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `quizzes` ADD COLUMN `timeLimit` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `lastLogin` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `certificates_issuedAt_idx` ON `certificates`(`issuedAt`);

-- CreateIndex
CREATE INDEX `course_enrollments_completed_idx` ON `course_enrollments`(`completed`);

-- CreateIndex
CREATE INDEX `course_enrollments_enrolledAt_idx` ON `course_enrollments`(`enrolledAt`);

-- CreateIndex
CREATE INDEX `course_enrollments_lastAccessed_idx` ON `course_enrollments`(`lastAccessed`);

-- CreateIndex
CREATE INDEX `course_outcomes_order_idx` ON `course_outcomes`(`order`);

-- CreateIndex
CREATE INDEX `course_requirements_order_idx` ON `course_requirements`(`order`);

-- CreateIndex
CREATE INDEX `course_reviews_rating_idx` ON `course_reviews`(`rating`);

-- CreateIndex
CREATE INDEX `course_reviews_createdAt_idx` ON `course_reviews`(`createdAt`);

-- CreateIndex
CREATE INDEX `courses_isDeleted_idx` ON `courses`(`isDeleted`);

-- CreateIndex
CREATE INDEX `courses_level_idx` ON `courses`(`level`);

-- CreateIndex
CREATE INDEX `courses_publishedAt_idx` ON `courses`(`publishedAt`);

-- CreateIndex
CREATE INDEX `discussion_replies_isInstructorReply_idx` ON `discussion_replies`(`isInstructorReply`);

-- CreateIndex
CREATE INDEX `discussion_replies_createdAt_idx` ON `discussion_replies`(`createdAt`);

-- CreateIndex
CREATE INDEX `discussions_isPinned_idx` ON `discussions`(`isPinned`);

-- CreateIndex
CREATE INDEX `discussions_isClosed_idx` ON `discussions`(`isClosed`);

-- CreateIndex
CREATE INDEX `discussions_createdAt_idx` ON `discussions`(`createdAt`);

-- CreateIndex
CREATE INDEX `lesson_resources_type_idx` ON `lesson_resources`(`type`);

-- CreateIndex
CREATE INDEX `lessons_order_idx` ON `lessons`(`order`);

-- CreateIndex
CREATE INDEX `lessons_isPreview_idx` ON `lessons`(`isPreview`);

-- CreateIndex
CREATE INDEX `lessons_duration_idx` ON `lessons`(`duration`);

-- CreateIndex
CREATE INDEX `modules_order_idx` ON `modules`(`order`);

-- CreateIndex
CREATE INDEX `modules_duration_idx` ON `modules`(`duration`);

-- CreateIndex
CREATE INDEX `password_reset_tokens_userId_idx` ON `password_reset_tokens`(`userId`);

-- CreateIndex
CREATE INDEX `password_reset_tokens_expires_idx` ON `password_reset_tokens`(`expires`);

-- CreateIndex
CREATE INDEX `quiz_attempts_isPassed_idx` ON `quiz_attempts`(`isPassed`);

-- CreateIndex
CREATE INDEX `quiz_attempts_completedAt_idx` ON `quiz_attempts`(`completedAt`);

-- CreateIndex
CREATE INDEX `quiz_attempts_timeSpent_idx` ON `quiz_attempts`(`timeSpent`);

-- CreateIndex
CREATE INDEX `quiz_questions_order_idx` ON `quiz_questions`(`order`);

-- CreateIndex
CREATE INDEX `quizzes_passingScore_idx` ON `quizzes`(`passingScore`);

-- CreateIndex
CREATE INDEX `quizzes_timeLimit_idx` ON `quizzes`(`timeLimit`);

-- CreateIndex
CREATE INDEX `user_progress_completed_idx` ON `user_progress`(`completed`);

-- CreateIndex
CREATE INDEX `user_progress_watchedDuration_idx` ON `user_progress`(`watchedDuration`);

-- CreateIndex
CREATE INDEX `users_deletedAt_idx` ON `users`(`deletedAt`);

-- CreateIndex
CREATE INDEX `users_role_idx` ON `users`(`role`);

-- CreateIndex
CREATE INDEX `users_lastLogin_idx` ON `users`(`lastLogin`);

-- CreateIndex
CREATE INDEX `verification_tokens_userId_idx` ON `verification_tokens`(`userId`);

-- CreateIndex
CREATE INDEX `verification_tokens_expires_idx` ON `verification_tokens`(`expires`);

-- RenameIndex
ALTER TABLE `courses` RENAME INDEX `courses_created_at_idx` TO `courses_createdAt_idx`;
