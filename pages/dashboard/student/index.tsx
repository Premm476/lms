import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { 
  FiBook, 
  FiCalendar, 
  FiCheckCircle, 
  FiBarChart2, 
  FiAward,
  FiFileText,
  FiUpload,
  FiClock,
  FiMessageSquare,
  FiBell,
  FiDownload,
  FiCreditCard,
  FiCode,
  FiUser,
  FiHelpCircle,
  FiLogOut,
  FiMoon,
  FiSun
} from 'react-icons/fi';
import { FaStar, FaRobot, FaTrophy } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import AnalyticsDashboard from '../../../components/AnalyticsDashboard';
import RecommendationsPanel from '../../../components/RecommendationsPanel';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Dark mode toggle component
const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved user preference or system preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && 
                   window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <button 
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <FiSun /> : <FiMoon />}
    </button>
  );
};

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

export default function StudentDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  
  // Mock data
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
  ];

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
  ];

  const pendingAssignments = [
    {
      id: 1,
      course: 'Advanced React Patterns',
      title: 'Redux Store Implementation',
      dueDate: 'Due in 2 days',
      points: 100
    },
    {
      id: 2,
      course: 'JavaScript Performance',
      title: 'Memory Leak Analysis',
      dueDate: 'Due in 5 days',
      points: 80
    }
  ];

  const leaderboard = [
    {
      id: 1,
      name: 'Alex Johnson',
      points: 1250,
      avatar: '/avatars/alex.jpg',
      progress: 92
    },
    {
      id: 2,
      name: 'Emma Davis',
      points: 1100,
      avatar: '/avatars/emma.jpg',
      progress: 85
    },
    {
      id: 3,
      name: session?.user?.name || 'You',
      points: 980,
      avatar: session?.user?.avatar || '/avatars/default.jpg',
      progress: 78
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      title: 'New announcement',
      message: 'Week 3 materials uploaded for Advanced React',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Assignment graded',
      message: 'Your "Component Patterns" assignment has been graded',
      time: '1 day ago',
      read: true
    }
  ];

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

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
            <p className="mt-2 opacity-90">"The expert in anything was once a beginner." - Helen Hayes</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <FiBook className="text-xl" />
            </div>
            <div>
              <p className="text-sm opacity-80">Learning Level</p>
              <p className="font-bold">Advanced Learner</p>
            </div>
            <DarkModeToggle />
            <button 
              onClick={handleSignOut}
              className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
            >
              <FiLogOut className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </motion.div>

      {/* AI Chat Assistant */}
      <motion.div variants={itemVariants} className="fixed bottom-6 right-6 z-50">
        <button className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
          <FaRobot className="text-2xl" />
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Course Management */}
          <motion.div variants={itemVariants} className="bg-white shadow rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Course Management</h2>
            </div>
            
            <div className="space-y-6">
              {/* Enrolled Courses */}
              <div>
                <h3 className="font-medium flex items-center mb-3">
                  <FiBook className="mr-2 text-indigo-600" /> Enrolled Courses
                </h3>
                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <div className="relative w-16 h-16 mr-4 bg-gray-100 rounded-md flex items-center justify-center">
                          {course.thumbnail ? (
                            <Image
                              src={course.thumbnail}
                              alt={course.title}
                              layout="fill"
                              className="rounded-md"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="text-xs text-gray-500 text-center p-1">
                              {course.title.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                          <p className="text-sm text-gray-500">Next: {course.nextLesson}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ProgressRing progress={course.progress} size={60} strokeWidth={6} />
                        <button className="ml-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                          Continue
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Upcoming Classes */}
              <div>
                <h3 className="font-medium flex items-center mb-3">
                  <FiCalendar className="mr-2 text-indigo-600" /> Upcoming Classes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="p-3 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                      <p className="font-medium">{classItem.title}</p>
                      <p className="text-sm text-gray-500">{classItem.course}</p>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-gray-600">{classItem.date}</span>
                        <span className="text-gray-600">{classItem.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Completed Courses */}
              <div>
                <h3 className="font-medium flex items-center mb-3">
                  <FiCheckCircle className="mr-2 text-indigo-600" /> Completed Courses
                </h3>
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50 text-center">
                  <p className="text-gray-600">No courses completed yet</p>
                  <button className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    View Certificate Archive
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Enhanced Learning Analytics */}
          <motion.div variants={itemVariants} className="space-y-6">
            <AnalyticsDashboard />
            
            <div className="bg-white shadow rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Learning Progress</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Leaderboard */}
                <div className="border border-gray-100 rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center">
                    <FaTrophy className="mr-2 text-yellow-500" /> Class Leaderboard
                  </h3>
                  <div className="space-y-3">
                    {leaderboard.map((student, index) => (
                      <div key={student.id} className={`flex items-center justify-between p-2 rounded-lg ${student.name === session?.user?.name ? 'bg-indigo-50' : ''}`}>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{index + 1}.</span>
                          <div className="relative w-8 h-8 mr-2 bg-gray-100 rounded-full flex items-center justify-center">
                            {student.avatar ? (
                              <Image
                                src={student.avatar}
                                alt={student.name}
                                layout="fill"
                                className="rounded-full"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="text-xs text-gray-500">
                                {student.name.substring(0, 1).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <span className={`${student.name === session?.user?.name ? 'font-bold text-indigo-600' : ''}`}>
                            {student.name}
                          </span>
                        </div>
                        <span className="font-medium">{student.points} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Daily/Weekly Goals */}
                <div className="border border-gray-100 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Learning Goals</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Daily Goal (2 hours)</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Weekly Goal (10 hours)</span>
                        <span className="text-sm font-medium">80%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <button className="w-full mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Adjust Goals
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. Assignments & Exams */}
          <motion.div variants={itemVariants} className="bg-white shadow rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Assignments & Exams</h2>
            </div>
            
            <div className="space-y-6">
              {/* Pending Assignments */}
              <div>
                <h3 className="font-medium flex items-center mb-3">
                  <FiFileText className="mr-2 text-indigo-600" /> Pending Assignments
                </h3>
                <div className="space-y-3">
                  {pendingAssignments.map((assignment) => (
                    <div key={assignment.id} className="p-3 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-gray-500">{assignment.course}</p>
                        </div>
                        <span className="text-sm font-medium text-indigo-600">{assignment.points} pts</span>
                      </div>
                      <div className="flex justify-between mt-2 items-center">
                        <span className="text-sm text-gray-600">{assignment.dueDate}</span>
                        <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors">
                          Submit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Submitted Assignments */}
              <div>
                <h3 className="font-medium flex items-center mb-3">
                  <FiUpload className="mr-2 text-indigo-600" /> Submitted Assignments
                </h3>
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <p className="text-gray-600">No recently submitted assignments</p>
                </div>
              </div>
              
              {/* Upcoming Quizzes/Tests */}
              <div>
                <h3 className="font-medium flex items-center mb-3">
                  <FiClock className="mr-2 text-indigo-600" /> Upcoming Quizzes/Tests
                </h3>
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <p className="text-gray-600">No upcoming quizzes or tests</p>
                </div>
              </div>
              
              {/* Exam Results & Performance */}
              <div>
                <h3 className="font-medium flex items-center mb-3">
                  <FiBarChart2 className="mr-2 text-indigo-600" /> Exam Results
                </h3>
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <p className="text-gray-600">No exam results available</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* 5. Recommendations & Discussions */}
          <motion.div variants={itemVariants} className="space-y-6">
            <RecommendationsPanel />
            
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <FiMessageSquare className="text-indigo-500 mr-2" /> Discussions
              </h2>
              
              <div className="space-y-4">
                <button className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                  <p className="font-medium">Advanced React Q&A</p>
                  <p className="text-sm text-gray-600">12 new messages</p>
                </button>
                <button className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                  <p className="font-medium">JavaScript Study Group</p>
                  <p className="text-sm text-gray-600">5 new messages</p>
                </button>
                <button className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                  <p className="font-medium">General Questions</p>
                  <p className="text-sm text-gray-600">3 new messages</p>
                </button>
              </div>
              
              <button className="w-full mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View All Discussions
              </button>
            </div>
          </motion.div>

          {/* 6. Notifications & Reminders */}
          <motion.div variants={itemVariants} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <FiBell className="text-indigo-500 mr-2" /> Notifications
            </h2>
            
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-indigo-50'}`}>
                  <div className="flex justify-between">
                    <p className="font-medium">{notification.title}</p>
                    {!notification.read && <span className="h-2 w-2 bg-indigo-600 rounded-full"></span>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All Notifications
            </button>
          </motion.div>

          {/* 7. Certificates & Achievements */}
          <motion.div variants={itemVariants} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <FiAward className="text-indigo-500 mr-2" /> Achievements
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FiAward className="text-yellow-600 text-xl" />
                </div>
                <p className="text-sm font-medium">Fast Learner</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaStar className="text-blue-600 text-xl" />
                </div>
                <p className="text-sm font-medium">Consistent</p>
              </div>
            </div>
            
            <button className="w-full mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-center">
              <FiDownload className="mr-2" /> Download Certificates
            </button>
          </motion.div>

          {/* Quick Access Menu */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-lg font-bold mb-4">Quick Access</h2>
            <div className="space-y-3">
              <button 
                onClick={() => router.push('/dashboard/student/profile')}
                className="w-full flex items-center justify-between p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
              >
                <span>Profile & Settings</span>
                <FiUser />
              </button>
              <button 
                onClick={() => router.push('/dashboard/student/payments')}
                className="w-full flex items-center justify-between p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
              >
                <span>Payment History</span>
                <FiCreditCard />
              </button>
              <button 
                onClick={() => router.push('/dashboard/student/code-editor')}
                className="w-full flex items-center justify-between p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
              >
                <span>Code Editor</span>
                <FiCode />
              </button>
              <button 
                onClick={() => router.push('/dashboard/student/support')}
                className="w-full flex items-center justify-between p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
              >
                <span>Feedback & Support</span>
                <FiHelpCircle />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

StudentDashboard.auth = true;