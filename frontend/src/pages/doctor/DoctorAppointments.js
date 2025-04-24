import { useEffect, useState } from 'react';
import axios from '../../api/axios';

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/doctor/appointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>My Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.patient.name} - {appointment.scheduled_at} - {appointment.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorAppointments;
