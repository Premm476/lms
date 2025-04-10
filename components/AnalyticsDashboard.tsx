import { FiActivity, FiTrendingUp, FiTarget } from 'react-icons/fi';
import { Bar, Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  // Weekly activity data
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Study Hours',
        data: [2, 3, 1.5, 2.5, 3, 1, 0.5],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
      }
    ]
  };

  // Course progress data
  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'React Course',
        data: [10, 30, 50, 70, 90],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        label: 'JavaScript Course',
        data: [15, 35, 45, 65, 85],
        borderColor: 'rgb(167, 139, 250)',
        backgroundColor: 'rgba(167, 139, 250, 0.5)',
      }
    ]
  };

  // Skill assessment data
  const skillsData = {
    labels: ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'TypeScript'],
    datasets: [
      {
        label: 'Current Skills',
        data: [85, 80, 75, 90, 65, 70],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2
      },
      {
        label: 'Target Skills',
        data: [95, 90, 85, 95, 80, 85],
        backgroundColor: 'rgba(167, 139, 250, 0.2)',
        borderColor: 'rgb(167, 139, 250)',
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Weekly Activity */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-4">
          <FiActivity className="text-indigo-600 mr-2" />
          <h3 className="font-semibold">Weekly Activity</h3>
        </div>
        <Bar 
          data={activityData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Hours'
                }
              }
            }
          }}
        />
      </div>

      {/* Course Progress */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-4">
          <FiTrendingUp className="text-indigo-600 mr-2" />
          <h3 className="font-semibold">Course Progress</h3>
        </div>
        <Line 
          data={progressData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: 'Completion %'
                }
              }
            }
          }}
        />
      </div>

      {/* Skill Assessment */}
      <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
        <div className="flex items-center mb-4">
          <FiTarget className="text-indigo-600 mr-2" />
          <h3 className="font-semibold">Skill Assessment</h3>
        </div>
        <Radar 
          data={skillsData}
          options={{
            responsive: true,
            scales: {
              r: {
                angleLines: {
                  display: true
                },
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
