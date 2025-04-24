import { useState, useEffect } from 'react';
import axios from '../../api/axios';

function CreateAppointment() {
  const [form, setForm] = useState({
    doctor_id: '',
    appointment_date: '',
    appointment_time: '',
  });
  const [message, setMessage] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('doctors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
  
      const scheduled_at = `${form.appointment_date} ${form.appointment_time}`;
  
      await axios.post('/patient/appointments/store', {
        doctor_id: form.doctor_id,
        scheduled_at: scheduled_at,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      setMessage('Appointment created successfully!');
      setForm({
        doctor_id: '',
        appointment_date: '',
        appointment_time: '',
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage(error.response?.data?.error || 'Failed to create appointment. Please try again.');
    }
  };
  

  return (
    <div>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit}>
        <select name="doctor_id" onChange={handleChange} value={form.doctor_id}>
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
                {doctor.user?.name} - {doctor.specialty}
            </option>
            ))}
        </select>
        <input
          type="date"
          name="appointment_date"
          onChange={handleChange}
          value={form.appointment_date}
        />
        <input
          type="time"
          name="appointment_time"
          onChange={handleChange}
          value={form.appointment_time}
        />
        <button type="submit">Create Appointment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateAppointment;
