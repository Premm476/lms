import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  FiBook, FiClock, FiBarChart2, 
  FiDownload, FiMessageSquare, FiChevronRight, FiCheckCircle 
} from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';

type Course = {
  id: string;
  title: string;
  instructor: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  progress: number;
  rating: number;
  students: number;
  thumbnail: string;
  syllabus: {
    week: number;
    title: string;
    completed: boolean;
  }[];
  resources: {
    type: string;
    title: string;
    url: string;
  }[];
};

export default function CourseDetail() {
  const { query } = useRouter();
  const courseId = query.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/3 relative h-64 md:h-auto">
            <Image
              src={course.thumbnail}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="p-8 md:w-2/3">
            <div className="flex items-center justify-between">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                {course.category}
              </span>
              <div className="flex items-center text-yellow-500">
                <FaStar />
                <span className="ml-1 text-gray-700">{course.rating} ({course.students.toLocaleString()} students)</span>
              </div>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">{course.title}</h1>
            <p className="mt-3 text-gray-600">{course.description}</p>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <FiClock className="mr-1" /> {course.duration}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FiBook className="mr-1" /> {course.lessons} lessons
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FiBarChart2 className="mr-1" /> {course.level}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress: {course.progress}%</span>
                <span className="text-sm font-medium text-indigo-600">Continue Learning</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Course Syllabus</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {course.syllabus.map((item) => (
                <div key={item.week} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Week {item.week}: {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.completed ? 'Completed' : 'Upcoming'} • 3 lessons
                      </p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  {item.completed && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <FiCheckCircle className="mr-1" /> Completed
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Resources</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {course.resources.map((resource, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FiDownload className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                      <p className="text-sm text-gray-500">{resource.type}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Instructor</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-16 w-16 relative">
                  <Image
                    src="/avatars/instructor.jpg"
                    alt="Instructor"
                    layout="fill"
                    className="rounded-full"
                    priority
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{course.instructor}</h3>
                  <p className="text-sm text-gray-500">Senior Frontend Engineer</p>
                  <div className="mt-1 flex items-center text-sm text-yellow-500">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <span className="ml-1 text-gray-600">4.8/5.0</span>
                  </div>
                </div>
              </div>
              <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                <FiMessageSquare className="inline mr-2" />
                Message Instructor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}