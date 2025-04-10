import { useSession } from 'next-auth/react';
import { FiAlertTriangle, FiCheckCircle, FiClock, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

const exams = [
  {
    id: 1,
    title: 'React Midterm Exam',
    course: 'Advanced React Patterns',
    date: '2023-06-20T09:00:00',
    duration: 90,
    status: 'upcoming',
    score: null
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals Test',
    course: 'JavaScript Performance',
    date: '2023-05-15T14:00:00',
    duration: 60,
    status: 'completed',
    score: 87
  }
];

export default function Exams() {
  const { data: _session } = useSession();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Exams</h1>
        <p className="mt-2 text-gray-600">View your upcoming and completed exams</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <FiClock className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Upcoming Exams</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FiCheckCircle className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Exams</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FiBarChart2 className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Score</p>
              <p className="text-2xl font-bold">87%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {exams.map((exam) => (
            <motion.li 
              key={exam.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="hover:bg-gray-50 transition-colors"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      {exam.status === 'upcoming' ? (
                        <FiAlertTriangle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <FiCheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {exam.course}
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {exam.title}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    {exam.status === 'upcoming' ? (
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Upcoming
                      </p>
                    ) : (
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Score: {exam.score}%
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Scheduled: {formatDate(exam.date)}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      Duration: {exam.duration} minutes
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    {exam.status === 'upcoming' ? (
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        View Details
                      </button>
                    ) : (
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        View Results
                      </button>
                    )}
                    {exam.status === 'upcoming' && (
                      <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700">
                        Start Exam
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}