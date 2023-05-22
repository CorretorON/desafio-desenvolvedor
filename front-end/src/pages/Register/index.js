import React, { useState } from 'react';
import api from '../../services/api';

export default function Register({ history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();

    // Validar campos obrigatórios
    const errors = {};
    if (name.trim() === '') {
      errors.name = 'O campo nome é obrigatório';
    }
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
      
      const response = await api.post('/register', {
        name,
        email,
        password
      });

      console.log(response.data); 

      alert("Usuário criado")
      window.location.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-background'>
      <div className={"container"}>
        <div className='content'>
          <h1>Cadastrar</h1>
          <form onSubmit={handleRegister}>
            <label htmlFor="name">Nome *</label>
            <input
              type="text"
              id="name"
              placeholder="Nome"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            {errors.name && <span className="error">{errors.name}</span>}
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
            <button className="btn" type="submit">Cadastrar</button>
          </form>
          <div className='center-form'>
            <p>Já possui cadastro?</p>
            <a href="/">Acessar</a>
          </div>
        </div>
      </div>
    </div>
  );
}
