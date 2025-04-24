import React, { ReactNode } from 'react'
import Head from 'next/head'
import { 
  FiHome, 
  FiBook, 
  FiCalendar, 
  FiUser,
  FiMessageSquare
} from 'react-icons/fi'
import { useRouter } from 'next/router'
import clsx from 'clsx'

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const navItems = [
    { icon: FiHome, path: '/dashboard', label: 'Home' },
    { icon: FiBook, path: '/dashboard/student/courses', label: 'Courses' },
    { icon: FiCalendar, path: '/dashboard/student/schedule', label: 'Schedule' },
    { icon: FiMessageSquare, path: '/dashboard/student/chat', label: 'Messages' },
    { icon: FiUser, path: '/dashboard/student/profile', label: 'Profile' }
  ]

  // Handler to open check results modal or navigate to check results page
  const handleCheckResultsClick = () => {
    router.push('/exam/check-results') // Assuming a dedicated page; else implement modal here
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Head>
        <title>LMS Platform</title>
        <meta name="description" content="Learning Management System" />
      </Head>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center">
          {/* Check Results Button placed first to appear near Home */}
          <button
            onClick={handleCheckResultsClick}
            className="flex flex-col items-center justify-center p-3 w-full text-gray-600 hover:text-indigo-600 transition-colors"
            aria-label="Check Results"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m1 5a9 9 0 11-18 0a9 9 0 0118 0z" />
            </svg>
            <span className="text-xs mt-1">Check Results</span>
          </button>
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={clsx(
                'flex flex-col items-center justify-center p-3 w-full',
                'text-gray-600 hover:text-indigo-600 transition-colors',
                router.pathname.startsWith(item.path) ? 'text-indigo-600' : ''
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
