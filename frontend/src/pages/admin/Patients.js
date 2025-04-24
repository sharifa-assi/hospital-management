import { useEffect, useState } from 'react';
import axios from '../../api/axios';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/admin/patients', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data.data)) {
          setPatients(response.data.data); 
        } else {
          console.error('Response data is not an array:', response.data);
          setError('Unexpected data structure');
        }
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Failed to fetch patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>All Patients</h2>
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

export default Patients;
