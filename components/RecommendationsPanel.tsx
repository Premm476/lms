import { FiBook, FiUsers, FiFileText } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

const RecommendationsPanel = () => {
  // Mock recommendation data
  const courseRecommendations = [
    {
      id: 1,
      title: 'Advanced State Management',
      reason: 'Based on your React progress',
      level: 'Intermediate'
    },
    {
      id: 2,
      title: 'TypeScript Fundamentals',
      reason: 'Complementary to your JavaScript skills',
      level: 'Beginner'
    }
  ];

  const studyGroupRecommendations = [
    {
      id: 1,
      name: 'React Performance Optimization',
      members: 12,
      activity: 'Active daily'
    },
    {
      id: 2,
      name: 'JavaScript Best Practices',
      members: 8,
      activity: 'Active weekly'
    }
  ];

  const resourceRecommendations = [
    {
      id: 1,
      title: 'React Design Patterns',
      type: 'E-book',
      relevance: 'Highly relevant'
    },
    {
      id: 2,
      title: 'JavaScript Memory Management',
      type: 'Article',
      relevance: 'Relevant'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <FaRobot className="text-indigo-600 mr-2 text-xl" />
        <h2 className="text-lg font-bold">Personalized Recommendations</h2>
      </div>

      {/* Course Recommendations */}
      <div className="mb-6">
        <h3 className="font-medium flex items-center mb-3">
          <FiBook className="mr-2 text-indigo-600" /> Suggested Courses
        </h3>
        <div className="space-y-3">
          {courseRecommendations.map(course => (
            <div key={course.id} className="p-3 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <p className="font-medium">{course.title}</p>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">{course.reason}</span>
                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                  {course.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Group Recommendations */}
      <div className="mb-6">
        <h3 className="font-medium flex items-center mb-3">
          <FiUsers className="mr-2 text-indigo-600" /> Study Groups
        </h3>
        <div className="space-y-3">
          {studyGroupRecommendations.map(group => (
            <div key={group.id} className="p-3 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <p className="font-medium">{group.name}</p>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">{group.members} members</span>
                <span className="text-gray-600">{group.activity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Recommendations */}
      <div>
        <h3 className="font-medium flex items-center mb-3">
          <FiFileText className="mr-2 text-indigo-600" /> Learning Resources
        </h3>
        <div className="space-y-3">
          {resourceRecommendations.map(resource => (
            <div key={resource.id} className="p-3 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <p className="font-medium">{resource.title}</p>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">{resource.type}</span>
                <span className="text-gray-600">{resource.relevance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPanel;
