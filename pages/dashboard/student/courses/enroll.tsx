import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FiCheckCircle, FiArrowLeft, FiClock, FiAward } from 'react-icons/fi';
import Image from 'next/image';

export default function CourseEnrollment() {
  const router = useRouter();
  const { data: _session } = useSession();
  const courseId = router.query.id;

  const course = {
    id: courseId,
    title: 'Advanced React Patterns',
    instructor: 'Sarah Johnson',
    description: 'Master advanced React concepts including hooks context, and performance optimization techniques to build scalable applications.',
    category: 'Frontend Development',
    level: 'Advanced',
    duration: '6 weeks',
    lessons: 24,
    price: 99.99,
    rating: 4.8,
    students: 1250,
    thumbnail: '/course-thumbnails/react.jpg',
    features: [
      '24 video lessons',
      'Downloadable resources',
      'Certificate of completion',
      'Q&A support',
      'Lifetime access'
    ]
  };

  const handleEnroll = () => {
    router.push(`/dashboard/student/courses/${course.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <FiArrowLeft className="mr-2" /> Back to Courses
      </button>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <Image
              src={course.thumbnail}
              alt={course.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
            <p className="mt-2 text-gray-600">Instructor: {course.instructor}</p>
            
            <div className="mt-6 flex items-center">
              <div className="flex items-center text-yellow-500">
                <FiAward className="mr-1" />
                <span className="text-gray-700 ml-1">{course.rating} ({course.students.toLocaleString()} students)</span>
              </div>
              <span className="mx-4 text-gray-300">|</span>
              <div className="flex items-center text-gray-500">
                <FiClock className="mr-1" />
                <span>{course.duration}</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">Course Includes:</h2>
              <ul className="mt-4 space-y-3">
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FiCheckCircle className="text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                <button
                  onClick={handleEnroll}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Enroll Now
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white shadow rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-900">About This Course</h2>
          <div className="mt-6 prose prose-indigo text-gray-500">
            <p>{course.description}</p>
            <p className="mt-4">
              This course will take you from intermediate to advanced React concepts. You'll learn how to optimize performance, 
              manage complex state, and build reusable component patterns that scale.
            </p>
            <h3 className="mt-6 text-lg font-semibold text-gray-900">What You'll Learn</h3>
            <ul className="mt-4 space-y-2">
              <li>Advanced React Hooks patterns and custom hooks</li>
              <li>Context API deep dive and state management solutions</li>
              <li>Performance optimization techniques</li>
              <li>Advanced component composition patterns</li>
              <li>Testing strategies for complex React applications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}