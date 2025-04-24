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
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function PatientsDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/patient/doctors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);

      const uniqueSpecialties = [
        ...new Set(response.data.map((doctor) => doctor.specialty)),
      ];
      setSpecialties(uniqueSpecialties);
      setFilteredDoctors(response.data);
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesName = doctor.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = specialtyFilter
        ? doctor.specialty.toLowerCase() === specialtyFilter.toLowerCase()
        : true;
      return matchesName && matchesSpecialty;
    });

    setFilteredDoctors(filtered);
    setPage(0);
  }, [searchTerm, specialtyFilter, doctors]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box mb={2} display="flex" justifyContent="space-between" gap={2}>
        <Box flex={1}>
          <TextField
            label="Search by Doctor Name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Box>
        <Box flex={1}>
          <FormControl fullWidth>
            <InputLabel>Filter by Specialty</InputLabel>
            <Select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              label="Filter by Specialty"
            >
              <MenuItem value="">All Specialties</MenuItem>
              {specialties.map((specialty) => (
                <MenuItem key={specialty} value={specialty}>
                  {specialty}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="Doctors Table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Specialty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDoctors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doctor) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={doctor.id}>
                  <TableCell>{doctor.id}</TableCell>
                  <TableCell>{doctor.user?.name}</TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
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
  );
}

export default PatientsDoctors;
