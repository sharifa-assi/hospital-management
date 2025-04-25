import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import AddDoctor from './pages/admin/AddDoctor';
import AllDoctors from './pages/admin/AllDoctors';
import Patients from './pages/admin/Patients';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorPatients from './pages/doctor/DoctorPatients';
import UploadFile from './pages/doctor/UploadFile';
import PatientsDoctors from './pages/patient/PatientsDoctors';
import PatientsAppointments from './pages/patient/PatientsAppointments';
import CreateAppointment from './pages/patient/CreateAppointment';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const contentStyle = {
    marginLeft: token ? '250px' : '0',
    width: '100%',
    padding: token ? '30px 30px 30px 30px' : '0',
    boxSizing: 'border-box',
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div style={styles.appContainer}>
        {token && <Sidebar />}
        <div style={contentStyle}>
          <Routes>
            <Route
              path="/login"
              element={token ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={token ? <Navigate to="/" /> : <Register />}
            />
            {token ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/admin/doctors" element={<AllDoctors />} />
                <Route path="/admin/add-doctor" element={<AddDoctor />} />
                <Route path="/admin/patients" element={<Patients />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}

            {token && user?.role === 'doctor' ? (
              <>
                <Route path="/doctor/appointments" element={<DoctorAppointments />} />
                <Route path="/doctor/patients" element={<DoctorPatients />} />
                <Route path="/doctor/upload-file" element={<UploadFile />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}

            {token && user?.role === 'patient' ? (
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
  },
};

export default App;
