import { FiAward, FiDownload } from 'react-icons/fi';

export default function Certificates() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
        <p className="mt-2 text-gray-600">View your earned certificates</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
          <FiAward className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="text-lg font-medium text-gray-900">No certificates yet</h2>
        <p className="mt-2 text-gray-600">
          Complete courses to earn certificates that showcase your achievements.
        </p>
        <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <FiDownload className="mr-2" />
          View Available Courses
        </button>
      </div>
    </div>
  );
}