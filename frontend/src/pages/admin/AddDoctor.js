import { useState } from 'react';
import axios from '../../api/axios';

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
    <div>
      <h2>Add New Doctor</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          name="password_confirmation"
          placeholder="Confirm Password"
          type="password"
          value={form.password_confirmation}
          onChange={handleChange}
        />
        <input
          name="specialty"
          placeholder="Specialty"
          value={form.specialty}
          onChange={handleChange}
        />
        <button type="submit">Add Doctor</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AddDoctor;
