import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Define the type for an assignment
interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  points: number;
}

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const response = await fetch('/api/student/assignments');
      const data = await response.json();
      setAssignments(data);
    };
    fetchAssignments();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h1 className="text-2xl font-bold">Your Assignments</h1>
      <ul className="mt-4 list-disc pl-5">
        {assignments.map((assignment) => (
          <li key={assignment.id} className="mt-2">
            <p className="font-medium">{assignment.title}</p>
            <p className="text-sm text-gray-500">Course: {assignment.course}</p>
            <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
            <p className="text-sm text-gray-500">Points: {assignment.points}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AssignmentsPage;
