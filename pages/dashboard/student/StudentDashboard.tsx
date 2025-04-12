import React from 'react'
import ResponsiveImage from '../../../components/ResponsiveImage'
import { motion } from 'framer-motion'

const enrolledCourses = [
  { 
    id: 1, 
    title: 'Advanced React Patterns', 
    instructor: 'Sarah Johnson',
    progress: 65,
    nextLesson: 'State Management with Redux',
    thumbnail: '/course-thumbnails/react.jpg'
  },
  { 
    id: 2, 
    title: 'JavaScript Performance', 
    instructor: 'Mike Chen',
    progress: 42,
    nextLesson: 'Memory Optimization',
    thumbnail: '/course-thumbnails/javascript.jpg'
  }
]

const upcomingClasses = [
  {
    id: 1,
    course: 'Advanced React Patterns',
    title: 'State Management with Redux',
    date: 'Tomorrow, 10:00 AM',
    duration: '1 hour'
  },
  {
    id: 2,
    course: 'JavaScript Performance',
    title: 'Memory Optimization',
    date: 'Friday, 2:00 PM',
    duration: '45 mins'
  }
]

export default function StudentDashboardV2() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
    >
      {/* Enrolled Courses Table - Temporary Implementation */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
        <div className="space-y-4">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="flex items-center border-b pb-4">
              <ResponsiveImage 
                src={course.thumbnail} 
                alt={course.title} 
                width={60} 
                height={60}
                className="mr-4"
              />
              <div className="flex-1">
                <p className="font-medium">{course.title}</p>
                <p className="text-sm text-gray-500">{course.instructor}</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Progress: {course.progress}% • Next: {course.nextLesson}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
        <ul className="divide-y divide-gray-200">
          {upcomingClasses.map((classItem) => (
            <li key={classItem.id} className="py-3">
              <p className="font-medium">{classItem.title}</p>
              <p className="text-sm text-gray-500">{classItem.course}</p>
              <p className="text-sm text-gray-500 mt-1">
                {classItem.date} • {classItem.duration}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
