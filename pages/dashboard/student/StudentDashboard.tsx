import React from 'react'
import DataTable from '../../../components/DataTableV2'
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
      {/* Enrolled Courses Table */}
      <DataTable
        columns={[
          { 
            header: 'Course', 
            accessor: 'title',
            cell: (_, row) => (
              <div className="flex items-center">
                <ResponsiveImage 
                  src={row.thumbnail} 
                  alt={row.title} 
                  width={60} 
                  height={60}
                  className="mr-4"
                />
                <div>
                  <p className="font-medium">{row.title}</p>
                  <p className="text-sm text-gray-500">{row.instructor}</p>
                </div>
              </div>
            )
          },
          { 
            header: 'Progress', 
            accessor: 'progress',
            cell: (value) => `${value}%`
          },
          { 
            header: 'Next Lesson', 
            accessor: 'nextLesson' 
          }
        ]}
        data={enrolledCourses}
        emptyMessage="No enrolled courses available."
      />

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
