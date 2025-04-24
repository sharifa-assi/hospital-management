import { useEffect, useState } from 'react';
import axios from '../../api/axios';

function PatientsDoctors() {
  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/patient/doctors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);
    };
    
    fetchDoctors();
  }, []);
  
  return (
    <div>
      <h2>Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>{doctor.user?.name} - {doctor.specialty}</li>
        ))}
      </ul>
    </div>
  );
}

export default PatientsDoctors;
