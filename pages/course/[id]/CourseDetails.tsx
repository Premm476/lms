import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Define the type for a course
interface Course {
  title: string;
  instructor: string;
  topics: string[];
}

const CourseDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const response = await fetch(`/api/courses/${id}`);
      const data = await response.json();
      setCourse(data);
    };
    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="mt-2">Instructor: {course.instructor}</p>
      <h2 className="mt-4 text-xl">Course Content</h2>
      <ul className="list-disc pl-5">
        {course.topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default CourseDetails;
