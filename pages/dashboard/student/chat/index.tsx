import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { FiSend, FiMessageSquare, FiUser, FiClock } from 'react-icons/fi';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
};

export default function Chat() {
  const { data: _session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Hi there! How can I help you with your courses today?',
        sender: 'other',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        text: 'I have a question about the React course assignment.',
        sender: 'user',
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: '3',
        text: 'Sure, what would you like to know about the assignment?',
        sender: 'other',
        timestamp: new Date(Date.now() - 900000)
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! An instructor will respond shortly.',
        sender: 'other',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4 flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            <FiMessageSquare className="h-5 w-5" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-white">Course Support Chat</h2>
            <p className="text-sm text-indigo-200">Online</p>
          </div>
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${message.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 flex items-center ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                  <FiClock className="mr-1" />
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 px-4 py-3">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <FiSend className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Conversations</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          <li className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Sarah Johnson (React Instructor)</p>
                <p className="text-sm text-gray-500">About the state management assignment...</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">
                2 days ago
              </div>
            </div>
          </li>
          <li className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Support Team</p>
                <p className="text-sm text-gray-500">Your certificate is ready for download</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">
                1 week ago
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}