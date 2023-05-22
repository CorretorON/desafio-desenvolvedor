import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async (event) => {
    event.preventDefault();

    
    const errors = {};
    if (email.trim() === '') {
      errors.email = 'O campo e-mail é obrigatório';
    }
    if (password.trim() === '') {
      errors.password = 'O campo senha é obrigatório';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      
      const response = await api.post('/login', {
        email,
        password
      });

    
      window.location.replace("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-background'>
      <div className={"container"}>
        <div className='content'>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">E-mail *</label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <label htmlFor="password">Senha *</label>
            <input
              type="password"
              id="password"
              placeholder="Senha"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            {errors.password && <span className="error">{errors.password}</span>}
            <button className="btn" type="submit">Entrar</button>
          </form>
          <div className='center-form'>
            <p>Ainda não possui uma conta?</p>
            <a href="/createAccount">Registrar-se</a>
          </div>
        </div>
      </div>
    </div>
  );
}
