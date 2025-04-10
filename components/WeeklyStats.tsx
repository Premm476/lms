import { FiClock, FiBook, FiAward } from 'react-icons/fi'

interface WeeklyStatsProps {
  role: 'student' | 'instructor'
}

export default function WeeklyStats({ role }: WeeklyStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-bold text-lg mb-4">
        {role === 'instructor' ? 'Weekly Teaching' : 'Weekly Learning'}
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <FiClock className="text-blue-500 text-2xl mb-2" />
          <span className="font-bold">5.2h</span>
          <span className="text-sm text-gray-500">
            {role === 'instructor' ? 'Teaching time' : 'Time spent'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <FiBook className="text-green-500 text-2xl mb-2" />
          <span className="font-bold">8</span>
          <span className="text-sm text-gray-500">
            {role === 'instructor' ? 'Sessions' : 'Lessons'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <FiAward className="text-yellow-500 text-2xl mb-2" />
          <span className="font-bold">3</span>
          <span className="text-sm text-gray-500">
            {role === 'instructor' ? 'Engagement' : 'Achievements'}
          </span>
        </div>
      </div>
    </div>
  )
}
