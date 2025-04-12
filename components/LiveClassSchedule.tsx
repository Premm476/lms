import React, { useState, useEffect } from 'react'
import { FiClock, FiVideo, FiCalendar } from 'react-icons/fi'

interface LiveClassScheduleProps {
  role: 'student' | 'instructor'
}

export default function LiveClassSchedule({ role }: LiveClassScheduleProps) {
  const [classes] = useState([
    {
      id: 1,
      title: 'Advanced React Patterns',
      topic: 'State Management with Context API',
      time: 'Today, 14:00',
      instructor: 'Sarah Johnson',
      duration: '1 hour',
      joinLink: '#'
    },
    {
      id: 2,
      title: 'JavaScript Performance',
      topic: 'Memory Optimization Techniques',
      time: 'Tomorrow, 10:00',
      instructor: 'Mike Chen',
      duration: '45 mins',
      joinLink: '#'
    }
  ])

  interface ClassType {
    id: number
    title: string
    topic: string
    time: string
    instructor: string
    duration: string
    joinLink: string
  }

  const [nextClass, setNextClass] = useState<ClassType | null>(null)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    // Find the next upcoming class
    const upcoming = classes.find(cls => cls.time.includes('Today'))
    setNextClass(upcoming || classes[0])

    // Calculate time until next class (mock)
    const calculateTimeLeft = () => {
      const now = new Date()
      const classTime = new Date(now)
      // Set to next hour for demo purposes
      const nextHour = now.getHours() + 1
      classTime.setHours(nextHour, 0, 0, 0)
      
      const diff = classTime.getTime() - now.getTime()
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff / (1000 * 60)) % 60)
        setTimeLeft(`${hours}h ${minutes}m`)
      } else {
        setTimeLeft('Starting soon')
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000)
    return () => clearInterval(timer)
  }, [classes])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-bold text-lg mb-4">
        {role === 'instructor' ? 'Your Scheduled Classes' : 'Live Classes'}
      </h3>
      
      {nextClass && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">Next: {nextClass.title}</h4>
            <div className="flex items-center text-sm text-blue-600">
              <FiClock className="mr-1" /> {timeLeft}
            </div>
          </div>
          <p className="text-sm mb-2">{nextClass.topic}</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span><FiCalendar className="inline mr-1" /> {nextClass.time}</span>
            <span>{nextClass.duration}</span>
          </div>
          <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded flex items-center justify-center">
            <FiVideo className="mr-2" />
            {role === 'instructor' ? 'Start Class' : 'Join Class'}
          </button>
        </div>
      )}

      <div className="space-y-4">
        {classes.map(cls => (
          <div key={cls.id} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
            <h4 className="font-medium">{cls.title}</h4>
            <p className="text-sm text-gray-600 mb-1">{cls.topic}</p>
            <div className="flex justify-between text-sm">
              <span><FiCalendar className="inline mr-1" /> {cls.time}</span>
              <span>{cls.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
