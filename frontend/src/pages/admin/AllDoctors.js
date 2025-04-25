import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/admin/doctors', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Response Data:', response.data);
        setDoctors(response.data);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value);
    setPage(0);
  };

  const specialties = Array.from(new Set(doctors.map((d) => d.specialty).filter(Boolean)));

  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.user?.name?.toLowerCase() || '';
    const specialty = doctor.specialty?.toLowerCase() || '';
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || specialty.includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="page-main-title">All Doctors</div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', width: '300px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <select
          value={selectedSpecialty}
          onChange={handleSpecialtyChange}
          style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          <option value="">All Specialties</option>
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="Doctors Table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Specialty</TableCell>
                <TableCell>Appointments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDoctors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((doctor) => (
                  <TableRow hover key={doctor.id}>
                    <TableCell>{doctor.id}</TableCell>
                    <TableCell>{doctor.user?.name}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>
                      {doctor.appointments && doctor.appointments.length > 0 ? (
                        doctor.appointments.map((appt) => (
                          <Typography
                            key={appt.id}
                            variant="body2"
                            sx={{ borderBottom: '1px solid #ddd', mb: 1 }}
                          >
                            {new Date(appt.scheduled_at).toLocaleString()} – {appt.status}
                            <br />
                            Patient: {appt.patient?.user?.name || 'N/A'}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No appointments
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredDoctors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default AllDoctors;
