import { useSession } from 'next-auth/react';
import { FiFileText } from 'react-icons/fi';

export default function Assignments() {
  const { data: _session } = useSession();

  const assignments = [
    {
      id: 1,
      title: 'Redux Store Implementation',
      course: 'Advanced React Patterns',
      dueDate: 'Due in 2 days',
      status: 'pending',
      points: 100
    },
    {
      id: 2,
      title: 'Memory Leak Analysis',
      course: 'JavaScript Performance',
      dueDate: 'Due in 5 days',
      status: 'pending',
      points: 80
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <p className="mt-2 text-gray-600">View and submit your assignments</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Pending Assignments</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {assignments.map((assignment) => (
            <li key={assignment.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FiFileText className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-indigo-600">{assignment.course}</p>
                    <p className="text-lg font-medium text-gray-900">{assignment.title}</p>
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {assignment.dueDate}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-500">{assignment.points} points</span>
                <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700">
                  Submit Assignment
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}