import { useSession } from 'next-auth/react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiEdit2 } from 'react-icons/fi';
import Image from 'next/image';

export default function Profile() {
  const { data: session } = useSession();

  const userData = {
    name: session?.user?.name || 'John Doe',
    email: session?.user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2023-01-15',
    location: 'San Francisco, CA',
    bio: 'Frontend developer passionate about React and UX design. Currently learning advanced patterns to build better applications.',
    image: session?.user?.image || '/avatars/default.jpg'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-indigo-700 px-6 py-8 sm:px-10 sm:py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white shadow-lg">
              <Image
                src={userData.image}
                alt={userData.name}
                layout="fill"
                className="rounded-full"
              />
            </div>
            <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
              <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
              <p className="text-indigo-200 mt-1">Student since {new Date(userData.joinDate).toLocaleDateString()}</p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-600 text-white">
                  Active Learner
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-600 text-white">
                  5 Courses Completed
                </span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:ml-auto">
              <button className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50">
                <FiEdit2 className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="px-6 py-8 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-gray-400">
                    <FiUser />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                    <p className="text-sm text-gray-900 mt-1">{userData.name}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-gray-400">
                    <FiMail />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Email address</p>
                    <p className="text-sm text-gray-900 mt-1">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-gray-400">
                    <FiPhone />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900 mt-1">{userData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-gray-400">
                    <FiCalendar />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Member Since</p>
                    <p className="text-sm text-gray-900 mt-1">
                      {new Date(userData.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-gray-400">
                    <FiMapPin />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-sm text-gray-900 mt-1">{userData.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">About Me</h2>
              <p className="text-gray-700">{userData.bio}</p>
              
              <h2 className="text-lg font-medium text-gray-900 mt-8 mb-6">Learning Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Courses Enrolled</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">8</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Courses Completed</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">5</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Avg. Course Grade</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">A-</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Learning Streak</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">12 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}