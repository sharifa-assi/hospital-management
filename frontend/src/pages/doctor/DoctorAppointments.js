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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function DoctorAppointments() {
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
        const response = await axios.get('/doctor/appointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data);
        setFilteredAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    console.log("Filtering appointments...");

    const filtered = appointments.filter((appt) => {
      const matchesName = appt.patient?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter ? appt.status.toLowerCase() === statusFilter.toLowerCase() : true;

      console.log(`Filtering: Name matches = ${matchesName}, Status matches = ${matchesStatus}`);
      return matchesName && matchesStatus;
    });

    setFilteredAppointments(filtered);
    setPage(0);
  }, [searchTerm, statusFilter, appointments]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`/appointments/${appointmentId}/status`, 
        { status: newStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedAppointment = response.data.appointment;
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === updatedAppointment.id ? { ...appt, status: updatedAppointment.status } : appt
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      <Box mb={2} display="flex" justifyContent="space-between" gap={2}>
        <Box flex={1}>
          <TextField
            label="Search by Patient Name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Box>
        <Box flex={1}>
          <FormControl fullWidth>
            <InputLabel>Status Filter</InputLabel>
            <Select
              value={statusFilter}
              label="Status Filter"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="scheduled">Scheduled</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="canceled">Canceled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="Appointments Table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Scheduled At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((appointment) => (
                <TableRow hover key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell>
                    {appointment.patient?.user?.name || 'Unknown'}
                  </TableCell>
                  <TableCell>{new Date(appointment.scheduled_at).toLocaleString()}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={appointment.status}
                        label="Status"
                        onChange={(e) =>
                          handleStatusChange(appointment.id, e.target.value)
                        }
                      >
                        <MenuItem value="scheduled">Scheduled</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="canceled">Canceled</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
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

export default DoctorAppointments;
