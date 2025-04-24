import { useState } from 'react';
import axios from '../../api/axios';
import './addDoctor.css';

function AddDoctor() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    specialty: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.specialty) {
      setError('Please fill in all fields');
      return;
    }

    if (form.password !== form.password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('/admin/add-doctor', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Doctor added successfully!');
      setForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        specialty: '',
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add doctor.';
      setMessage('');
      setError(errorMessage);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Doctor</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password_confirmation">Confirm Password:</label>
          <input
            name="password_confirmation"
            placeholder="Confirm Password"
            type="password"
            value={form.password_confirmation}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialty">Specialty:</label>
          <input
            name="specialty"
            placeholder="Specialty"
            value={form.specialty}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-btn">Add Doctor</button>
      </form>

      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
}

export default AddDoctor;
