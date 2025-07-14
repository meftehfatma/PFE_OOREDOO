import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './component/login';
import Chatbot from './component/chatbot';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/chatbot"
        element={isAuthenticated ? <Chatbot /> : <Navigate to="/" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

