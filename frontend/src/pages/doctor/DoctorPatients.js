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
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function DoctorPatients() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/doctor/patients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const filtered = patients.filter((patient) => {
      const matchesName = patient.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesName;
    });

    setFilteredPatients(filtered);
    setPage(0);
  }, [searchTerm, patients]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewFile = async (fileId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`/files/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const contentDisposition = response.headers['content-disposition'];
      let filename = 'downloaded_file.docx';

      if (contentDisposition && contentDisposition.includes('filename=')) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match?.[1]) filename = match[1];
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to view/download file:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFileUrl(null);
  };

  return (
    <div>
      <div className="page-main-title">Patients</div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
        </Box>

        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="Patients Table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Files</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((patient) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>{patient.user.name}</TableCell>
                    <TableCell>{patient.user.email}</TableCell>
                    <TableCell>{patient.date_of_birth}</TableCell>
                    <TableCell>
                      {patient.files && patient.files.length > 0 ? (
                        patient.files.map((file) => (
                          <IconButton
                            key={file.id}
                            color="primary"
                            onClick={() => handleViewFile(file.id)}
                            title={file.filename}
                          >
                            <FileCopyIcon />
                          </IconButton>
                        ))
                      ) : (
                        <span>No files</span>
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
          count={filteredPatients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
          <DialogTitle>View File</DialogTitle>
          <DialogContent>
            {fileUrl && (
              <iframe
                src={fileUrl}
                title="File Viewer"
                width="100%"
                height="500px"
                style={{ border: 'none' }}
              ></iframe>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}

export default DoctorPatients;
