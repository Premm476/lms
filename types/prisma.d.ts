import { Course, CourseEnrollment, User } from '@prisma/client'

export type CourseEnrollmentWithCourse = CourseEnrollment & {
  course: Course
}

export type UserWithEnrollments = User & {
  enrollments: CourseEnrollmentWithCourse[]
}