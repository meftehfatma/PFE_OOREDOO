import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../images/logo.png'; // Assure-toi que ce chemin est correct

const allowedEmails = [
  "fatma.mefteh@ooredoo.tn",
  // Ajoute ici d'autres emails autorisés
];

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-z]+\.[a-z]+@ooredoo\.tn$/;

    if (!emailRegex.test(email)) {
      setError("L'adresse e-mail doit être au format prénom.nom@ooredoo.tn");
      return;
    }

    if (!allowedEmails.includes(email.toLowerCase())) {
      setError("Accès refusé.");
      return;
    }

    if (!password) {
      setError("Le mot de passe est requis.");
      return;
    }

    setError('');
    onLogin();
    navigate('/chatbot');
  };

  return (
    <div className="login-container">
      <div className="logo-wrapper">
        <img src={logo} alt="Logo Ooredoo" className="logo-img" />
      </div>

      <div className="login-box">
        <h2 className="login-title">Connexion</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Se connecter</button>
          {error && <p className="login-error">{error}</p>}
        </form>
      </div>

      <p className="login-instruction">
        L'adresse e-mail doit être au format : prénom.nom@ooredoo.tn
      </p>
    </div>
  );
}

export default Login;

