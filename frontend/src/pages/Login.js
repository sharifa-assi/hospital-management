import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './register.css';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', values);
      localStorage.setItem('token', response.data.token);

      const { id, name, email, role } = response.data.user;
      localStorage.setItem('user', JSON.stringify({ id, name, email, role }));

      setError('');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="formInput login-fields-container">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={onChange}
            required
            className="input-full"
          />
        </div>

        <div className="formInput login-fields-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={onChange}
            required
            className="input-full"
          />
        </div>

        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
