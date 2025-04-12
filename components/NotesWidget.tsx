import React, { useState } from 'react'
import { FiTrash2, FiPlus } from 'react-icons/fi'

interface NotesWidgetProps {
  role: 'student' | 'instructor'
}

export default function NotesWidget({ role }: NotesWidgetProps) {
  const [notes, setNotes] = useState([
    { id: 1, title: 'React Hooks', content: 'useState and useEffect are fundamental hooks' },
    { id: 2, title: 'Project Ideas', content: 'Build a portfolio with Next.js' }
  ])
  const [activeNote, setActiveNote] = useState(notes[0]?.id || null)
  const [isEditing, setIsEditing] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '' })

  const saveNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      setNotes([...notes, { id: Date.now(), ...newNote }])
      setNewNote({ title: '', content: '' })
    }
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
    if (activeNote === id) setActiveNote(null)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">
          {role === 'instructor' ? 'Teaching Notes' : 'My Notes'}
        </h3>
        <button 
          onClick={() => {
            setActiveNote(null)
            setIsEditing(true)
            setNewNote({ title: '', content: '' })
          }}
          className="text-blue-500 flex items-center text-sm"
        >
          <FiPlus className="mr-1" /> New Note
        </button>
      </div>

      <div className="flex">
        <div className="w-1/3 pr-4 border-r">
          {notes.map(note => (
            <div 
              key={note.id}
              onClick={() => {
                setActiveNote(note.id)
                setIsEditing(false)
              }}
              className={`p-2 mb-2 rounded cursor-pointer ${activeNote === note.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <h4 className="font-medium">{note.title}</h4>
              <p className="text-sm text-gray-500 truncate">{note.content}</p>
            </div>
          ))}
        </div>

        <div className="w-2/3 pl-4">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                placeholder="Note title"
                className="w-full border-b pb-2 mb-4 font-medium focus:outline-none"
              />
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                placeholder="Write your note here..."
                className="w-full h-40 border rounded p-2 text-sm focus:outline-none"
              />
              <div className="flex justify-end mt-2 space-x-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-sm border rounded"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveNote}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : activeNote ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-lg">
                  {notes.find(n => n.id === activeNote)?.title}
                </h4>
                <button 
                  onClick={() => deleteNote(activeNote)}
                  className="text-red-500"
                >
                  <FiTrash2 />
                </button>
              </div>
              <p className="text-gray-700">
                {notes.find(n => n.id === activeNote)?.content}
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              Select or create a note
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
