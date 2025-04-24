import { useEffect, useState } from 'react';
import axios from '../../api/axios';

function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/admin/doctors', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data.data)) {
          setDoctors(response.data.data); 
        } else {
          console.error('Response data is not an array:', response.data);
          setError('Unexpected data structure');
        }
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>All Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.user.name} - {doctor.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllDoctors;
