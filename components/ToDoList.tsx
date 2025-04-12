import React, { useState } from 'react'
import { FiCheck, FiPlus } from 'react-icons/fi'

interface ToDoListProps {
  role: 'student' | 'instructor'
}

export default function ToDoList({ role }: ToDoListProps) {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete React assignment', completed: false },
    { id: 2, text: 'Review JavaScript concepts', completed: true },
    { id: 3, text: 'Watch lesson video', completed: false }
  ])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-bold text-lg mb-4">
        {role === 'instructor' ? 'Teaching Tasks' : 'Today\'s Tasks'}
      </h3>
      <div className="space-y-2 mb-4">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center">
            <button 
              onClick={() => toggleTask(task.id)}
              className={`w-5 h-5 rounded mr-3 flex items-center justify-center ${task.completed ? 'bg-green-500 text-white' : 'border border-gray-300'}`}
            >
              {task.completed && <FiCheck size={12} />}
            </button>
            <span className={task.completed ? 'line-through text-gray-400' : ''}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder={role === 'instructor' ? 'Add new teaching task...' : 'Add new task...'}
          className="flex-1 border rounded-l px-3 py-2 text-sm"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button 
          onClick={addTask}
          className="bg-blue-500 text-white px-3 rounded-r flex items-center"
        >
          <FiPlus />
        </button>
      </div>
    </div>
  )
}
