import { useEffect, useState } from 'react';
import axios from '../../api/axios';

function DoctorPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/doctor/patients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h2>My Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.user.name} - {patient.user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorPatients;
