"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

// Import course data and types from courseApi
import type { CourseWithDetails } from "lib/courseApi";
import { getCourse, getCourses } from "lib/courseApi";

export default function CourseDetail() {
  const router = useRouter();
  const [course, setCourse] = useState<CourseWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [_relatedCourses, setRelatedCourses] = useState<CourseWithDetails[]>([]);

  // Get course ID from URL
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const pathSegments = window.location.pathname.split('/');
        const courseId = pathSegments[pathSegments.length - 1];
        const fetchedCourse = await getCourse(courseId);
        
        setCourse(fetchedCourse);
        // Get related courses from API
        const allCourses = await getCourses();
        setRelatedCourses(
          allCourses
            .filter(c => c.category === fetchedCourse.category && c.id !== fetchedCourse.id)
            .slice(0, 3)
        );
      } catch (error) {
        console.error('Error fetching course:', error);
        router.push('/courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 bg-gray-200 rounded-xl"></div>
                <div className="mt-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded-lg"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) return <></>;

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 p-4 text-gray-600 hover:text-gray-900"
      >
        <FiArrowLeft />
        Back to courses
      </button>
      
      {course && (
        <div className="container mx-auto px-4 py-8">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1 className="text-3xl font-bold mt-6">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
        </div>
      )}
    </motion.div>
  );
}
