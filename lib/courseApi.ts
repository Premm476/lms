type Instructor = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  bio: string | null;
};

type User = {
  name: string;
  image: string | null;
};

type Lesson = {
  id: string;
  title: string;
  duration: string;
  content: string;
  videoUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

type Enrollment = {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type Discussion = {
  id: string;
  userId: string;
  courseId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  category: string;
  image: string;
  isFeatured: boolean;
  instructorId: string;
  createdAt: string;
  updatedAt: string;
};

export type CourseWithDetails = Course & {
  instructor: Instructor;
  modules: (Module & {
    lessons: Lesson[];
  })[];
  enrollments?: Enrollment[];
  discussions?: (Discussion & {
    user: {
      name: string;
      image: string | null;
    };
  })[];
  enrollmentCount: number;
  discussionCount: number;
  isEnrolled: boolean;
  enrollment?: Enrollment | null;
};

export async function getCourses(): Promise<CourseWithDetails[]> {
  const res = await fetch('/api/courses');
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }
  return res.json();
}

export async function getCourse(id: string): Promise<CourseWithDetails> {
  const res = await fetch(`/api/courses/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch course');
  }
  return res.json();
}
