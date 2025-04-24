import React, { useState } from 'react';

const ChatAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { user: input, bot: '' };
    setMessages((prev) => [...prev, userMessage]);

    // Call the Hugging Face API here
    const response = await fetch('https://api-inference.huggingface.co/models/YOUR_MODEL_NAME', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer YOUR_HUGGING_FACE_API_KEY`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: input }),
    });

    const data = await response.json();
    const botMessage = data.generated_text || 'Sorry, I could not understand that.';
    setMessages((prev) => {
      const updatedMessages = [...prev];
      updatedMessages[updatedMessages.length - 1].bot = botMessage;
      return updatedMessages;
    });

    setInput('');
  };

  return (
    <div className="chat-assistant">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <div><strong>User:</strong> {msg.user}</div>
            <div><strong>Bot:</strong> {msg.bot}</div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatAssistant;
