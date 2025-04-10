import { useSession } from 'next-auth/react';
import { FiBook, FiUsers, FiBarChart2, FiDollarSign, FiMessageSquare } from 'react-icons/fi';
import { FaStar, FaRegStar, FaChartLine, FaChalkboardTeacher } from 'react-icons/fa';
import { RiQuillPenLine } from 'react-icons/ri';
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

const ProgressRing = ({ progress, size = 40, strokeWidth = 4 }: { progress: number, size?: number, strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        height={size}
        width={size}
        className="transform -rotate-90"
      >
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-indigo-600"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-xs font-bold">
        {progress}%
      </span>
    </div>
  );
};

export default function InstructorDashboard() {
  const { data: session } = useSession();
  
  // Mock data
  const stats = [
    { 
      name: 'Total Courses', 
      value: 8, 
      icon: FiBook, 
      change: '+2 from last month',
      color: 'text-indigo-600'
    },
    { 
      name: 'Total Students', 
      value: 142, 
      icon: FiUsers, 
      change: '+12 from last month',
      color: 'text-green-600'
    },
    { 
      name: 'Completion Rate', 
      value: '78%', 
      icon: FiBarChart2, 
      change: '+5% from last month',
      color: 'text-blue-600'
    },
    { 
      name: 'Total Revenue', 
      value: '$3,240', 
      icon: FiDollarSign, 
      change: '+$420 from last month',
      color: 'text-purple-600'
    },
  ];

  const recentStudents = [
    { 
      id: 1, 
      name: 'Alex Johnson', 
      email: 'alex@example.com', 
      joined: '2 days ago',
      avatar: '/avatars/alex.jpg',
      course: 'Advanced React',
      progress: 65
    },
    { 
      id: 2, 
      name: 'Sarah Williams', 
      email: 'sarah@example.com', 
      joined: '5 days ago',
      avatar: '/avatars/sarah.jpg',
      course: 'JavaScript Patterns',
      progress: 42
    },
  ];

  const topCourses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      students: 85,
      rating: 4.8,
      revenue: '$1,250',
      thumbnail: '/course-thumbnails/react.jpg'
    },
    {
      id: 2,
      title: 'JavaScript Performance',
      students: 62,
      rating: 4.6,
      revenue: '$980',
      thumbnail: '/course-thumbnails/javascript.jpg'
    }
  ];

  const recentReviews = [
    {
      id: 1,
      student: 'Emma Davis',
      course: 'Advanced React',
      rating: 5,
      comment: 'The best React course I\'ve taken! The instructor explains complex concepts clearly.',
      date: '2 days ago'
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {session?.user?.name}!</h1>
            <p className="mt-2 opacity-90">"Teaching is the greatest act of optimism." - Colleen Wilcox</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <FaChalkboardTeacher className="text-xl" />
            </div>
            <div>
              <p className="text-sm opacity-80">Instructor Level</p>
              <p className="font-bold">Pro Educator</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-20 mr-4`}>
                <stat.icon className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Students */}
          <motion.div variants={itemVariants} className="bg-white shadow rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Students</h2>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View All Students →
              </button>
            </div>
            
            <div className="space-y-4">
              {recentStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 mr-4">
                      <Image
                        src={student.avatar}
                        alt={student.name}
                        layout="fill"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{student.joined}</p>
                    <div className="flex items-center justify-end mt-1">
                      <span className="text-xs text-gray-500 mr-2">{student.progress}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-indigo-600 h-1.5 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Performing Courses */}
          <motion.div variants={itemVariants} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Top Performing Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topCourses.map((course) => (
                <div key={course.id} className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative w-full h-32">
                    <Image 
                      src={course.thumbnail} 
                      alt={course.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="flex items-center text-gray-600">
                        <FiUsers className="mr-1" /> {course.students} students
                      </span>
                      <span className="flex items-center text-yellow-500">
                        <FaStar className="mr-1" /> {course.rating}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-600">{course.revenue}</span>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        View Analytics
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Reviews */}
          <motion.div variants={itemVariants} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <FiMessageSquare className="text-indigo-500 mr-2" /> Recent Reviews
            </h2>
            
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="border-l-4 border-indigo-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{review.student}</h3>
                      <p className="text-sm text-gray-600">{review.course}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        i < review.rating ? 
                          <FaStar key={i} className="w-4 h-4 text-yellow-400" /> : 
                          <FaRegStar key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2 italic">"{review.comment}"</p>
                  <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All Reviews
            </button>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all">
                <span>Create New Course</span>
                <RiQuillPenLine />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all">
                <span>View Earnings</span>
                <FiDollarSign />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all">
                <span>Analytics Dashboard</span>
                <FaChartLine />
              </button>
            </div>
          </motion.div>

          {/* Teaching Goals */}
          <motion.div variants={itemVariants} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Your Teaching Goals</h2>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-medium">Reach 200 Students</p>
                <p className="text-sm text-gray-600">58 students to go</p>
              </div>
              <ProgressRing progress={71} size={60} strokeWidth={6} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Earn $5,000</p>
                <p className="text-sm text-gray-600">$1,760 to go</p>
              </div>
              <ProgressRing progress={65} size={60} strokeWidth={6} />
            </div>
            <button className="w-full mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Set New Goals
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

InstructorDashboard.auth = true;