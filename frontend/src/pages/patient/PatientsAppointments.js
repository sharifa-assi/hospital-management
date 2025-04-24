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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function PatientsAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/patient/appointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data);
        setFilteredAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    console.log('Filtering appointments...');
    
    let filtered = appointments.filter((appointment) => {
      const doctorName = appointment.doctor?.user?.name.toLowerCase();
      const matchesSearchTerm = doctorName?.includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter
        ? appointment.status.toLowerCase() === statusFilter.toLowerCase()
        : true;

      console.log(`Filtering: Doctor Name match = ${matchesSearchTerm}, Status match = ${matchesStatus}`);
      return matchesSearchTerm && matchesStatus;
    });

    setFilteredAppointments(filtered);
    setPage(0);
  }, [searchTerm, statusFilter, appointments]);

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
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="scheduled">Scheduled</MenuItem>
              <MenuItem value="canceled">Canceled</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="Appointments Table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((appointment) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell>{new Date(appointment.scheduled_at).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(appointment.scheduled_at).toLocaleTimeString()}</TableCell>
                  <TableCell>Dr. {appointment.doctor?.user?.name}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredAppointments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default PatientsAppointments;
