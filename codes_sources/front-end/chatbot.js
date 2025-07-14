import React, { useState, useRef, useEffect } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const response = await fetch('/api/ask/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();

      const botMsg = {
        sender: 'bot',
        text: data.answer || "❌ Aucune réponse reçue du backend.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Erreur serveur :', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "❌ Erreur de communication avec le backend." },
      ]);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === 'user' ? 'right' : 'left', marginBottom: 10 }}>
            <span
              style={{
                display: 'inline-block',
                padding: 12,
                borderRadius: 20,
                backgroundColor: m.sender === 'user' ? '#d0021b' : '#eee',
                color: m.sender === 'user' ? 'white' : 'black',
                maxWidth: '70%',
                wordWrap: 'break-word',
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: 'flex', padding: 10, borderTop: '1px solid #ccc' }}>
        <input
          type="text"
          placeholder="Pose ta question ici..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: 10, fontSize: 16, borderRadius: 5, border: '1px solid #ccc' }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: 10,
            backgroundColor: '#d0021b',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 5,
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default Chatbot;

