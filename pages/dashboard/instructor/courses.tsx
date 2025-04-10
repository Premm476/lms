import { useRouter } from 'next/router';
import { FiEdit2, FiTrash2, FiPlus, FiUsers, FiDollarSign, FiBook } from 'react-icons/fi';
import { FaStar, FaRegStar, FaChartLine } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function InstructorCourses() {
  const router = useRouter();
  
  // Mock data
  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      students: 85,
      published: true,
      rating: 4.8,
      revenue: '$1,250',
      lastUpdated: '3 days ago',
      thumbnail: '/course-thumbnails/react.jpg',
      category: 'Frontend'
    },
    {
      id: 2,
      title: 'JavaScript Performance',
      students: 62,
      published: true,
      rating: 4.6,
      revenue: '$980',
      lastUpdated: '1 week ago',
      thumbnail: '/course-thumbnails/javascript.jpg',
      category: 'Programming'
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-gray-800">Your Courses</h1>
          <p className="text-gray-600">Manage and track your course performance</p>
        </motion.div>
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/dashboard/instructor/courses/create')}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FiPlus className="mr-2" />
          New Course
        </motion.button>
      </div>

      <motion.div variants={itemVariants} className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <motion.tr 
                  key={course.id}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-16 relative">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiUsers className="text-gray-500 mr-1" />
                      <span>{course.students}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${course.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {course.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.rating ? (
                      <div className="flex items-center">
                        <span className="text-gray-900">{course.rating}</span>
                        <div className="ml-1 flex">
                          {[...Array(5)].map((_, i) => (
                            i < Math.floor(course.rating!) ? 
                              <FaStar key={i} className="w-4 h-4 text-yellow-400" /> : 
                              <FaRegStar key={i} className="w-4 h-4 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500">Not rated</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {course.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/dashboard/instructor/courses/${course.id}`)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                        title="View Analytics"
                      >
                        <FaChartLine />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Course Performance Summary */}
      <motion.div 
        variants={itemVariants}
        className="mt-8 bg-white shadow rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Course Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600">Total Courses</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <FiBook className="text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Active Students</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiUsers className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Total Revenue</p>
                <p className="text-2xl font-bold">$3,240</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiDollarSign className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

InstructorCourses.auth = true;