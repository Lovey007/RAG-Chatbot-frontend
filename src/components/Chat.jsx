import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function generateSessionId() {
  return 'sess-' + Math.random().toString(36).substr(2, 9);
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const Chat = () => {
  const [sessionId, setSessionId] = useState(() => generateSessionId());
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/history`, { params: { sessionId } });
      setMessages((res.data.history || []).map(msg => ({ ...msg, time: msg.time || Date.now() })));
    } catch (e) {
      setMessages([]);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const now = Date.now();
    const userMsg = { sender: 'user', message: input, time: now };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    setInput('');
    try {
      const res = await axios.post(`${API_URL}/chat`, { sessionId, message: input });
      setMessages((msgs) => [...msgs, { sender: 'bot', message: res.data.reply, time: Date.now() }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { sender: 'bot', message: 'Error: Could not get response.', time: Date.now() }]);
    }
    setLoading(false);
  };

  const resetSession = async () => {
    await axios.post(`${API_URL}/reset`, { sessionId });
    setMessages([]);
    setSessionId(generateSessionId());
  };

  return (
    <div className="chat-app">
  <header className="chat-header">
    <div className="chat-title">
      <span className="chat-icon">📰</span>
      <h2>RAG News Chatbot</h2>
    </div>
    <button className="reset-btn" onClick={resetSession}>⟲ Reset</button>
  </header>

  <main className="chat-messages">
    {messages.map((msg, idx) => (
      <div key={idx} className={`chat-msg ${msg.sender}`}>
        <div className="chat-avatar">
          {msg.sender === 'user' ? '🧑' : '🤖'}
        </div>
        <div className="chat-bubble">
          <div className="chat-meta">
            <span className="chat-sender">{msg.sender === 'user' ? 'You' : 'Bot'}</span>
            <span className="chat-time">{formatTime(msg.time)}</span>
          </div>
          <div className="chat-text">{msg.message}</div>
        </div>
      </div>
    ))}

    {loading && (
      <div className="chat-msg bot">
        <div className="chat-avatar">🤖</div>
        <div className="chat-bubble">
          <div className="chat-meta">
            <span className="chat-sender">Bot</span>
            <span className="chat-time">...</span>
          </div>
          <div className="chat-text typing">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    )}

    <div ref={messagesEndRef} />
  </main>

  <form className="chat-input" onSubmit={sendMessage}>
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type your message..."
      disabled={loading}
      autoFocus
    />
    <button type="submit" disabled={loading || !input.trim()}>Send</button>
  </form>
</div>

  );
};

export default Chat;
