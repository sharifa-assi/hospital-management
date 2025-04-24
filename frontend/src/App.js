import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import AddDoctor from './pages/admin/AddDoctor';
import AllDoctors from './pages/admin/AllDoctors';
import Patients from './pages/admin/Patients';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorPatients from './pages/doctor/DoctorPatients';
import PatientsDoctors from './pages/patient/PatientsDoctors';
import PatientsAppointments from './pages/patient/PatientsAppointments';
import CreateAppointment from './pages/patient/CreateAppointment';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Navbar />
      <div style={styles.appContainer}>
        <Sidebar />
        <div style={styles.content}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            {token ? (
              <>
                <Route path="/admin/doctors" element={<AllDoctors />} />
                <Route path="/admin/add-doctor" element={<AddDoctor />} />
                <Route path="/admin/patients" element={<Patients />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}

            {/* Doctor Routes */}
            {token ? (
              <>
                <Route path="/doctor/appointments" element={<DoctorAppointments />} />
                <Route path="/doctor/patients" element={<DoctorPatients />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}

            {/* Patient Routes */}
            {token ? (
              <>
                <Route path="/patient/doctors" element={<PatientsDoctors />} />
                <Route path="/patient/appointments" element={<PatientsAppointments />} />
                <Route path="/patient/appointments/store" element={<CreateAppointment />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    paddingTop: '60px',
  },
  content: {
    marginLeft: '250px',
    padding: '20px',
    width: '100%',
  },
};

export default App;
