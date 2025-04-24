import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { 
  FiLogOut,
  FiMoon,
  FiSun
} from 'react-icons/fi';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Define the type for a course
interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
}

// Dark mode toggle component
const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
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

const ProgressRing = ({ progress, size = 40, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={size} width={size} className="transform -rotate-90">
        <circle className="text-gray-200" strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
        <circle className="text-indigo-600" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
      </svg>
      <span className="absolute text-xs font-bold">{progress}%</span>
    </div>
  );
};

export default function StudentDashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  // Fetch enrolled courses for the logged-in user
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!session?.user?.id) {
        setEnrolledCourses([]);
        return;
      }
      const response = await fetch(`/api/student/courses?userId=${session.user.id}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setEnrolledCourses(data);
      } else {
        setEnrolledCourses([]);
        console.error('Failed to fetch courses or invalid data:', data);
      }
    };
    fetchCourses();
  }, [session]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back!</h1>
            <p className="mt-2 opacity-90">"The expert in anything was once a beginner." - Helen Hayes</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <DarkModeToggle />
            <button onClick={handleSignOut} className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
              <FiLogOut className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Management */}
          <motion.div variants={itemVariants} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold">Course Management</h2>
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow" onClick={() => router.push(`/course/${course.id}`)}>
                  <div className="flex items-center">
                    <Image src={course.thumbnail} alt={course.title} width={64} height={64} className="rounded-md" />
                    <div className="ml-4">
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                    </div>
                  </div>
                  <ProgressRing progress={course.progress} size={60} strokeWidth={6} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

StudentDashboard.auth = true;
