import { Link, NavLink } from 'react-router-dom';
import './sidebar.css';

function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {role === 'admin' && (
          <>
            <li>
              <NavLink to="/admin/doctors" className={({ isActive }) => isActive ? "sidebar-item active-link" : "sidebar-item"}>
                All Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/add-doctor" className={({ isActive }) => isActive ? "sidebar-item active-link" : "sidebar-item"}>
                Add Doctor
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/patients" className={({ isActive }) => isActive ? "sidebar-item active-link" : "sidebar-item"}>
                All Patients
              </NavLink>
            </li>
          </>
        )}

        {role === 'doctor' && (
          <>
            <li>
              <NavLink to="/doctor/appointments" className={({ isActive }) => isActive ? "sidebar-item active-link" : "sidebar-item"}>
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor/patients" className={({ isActive }) => isActive ? "sidebar-item active-link" : "sidebar-item"}>
                Your Patients
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor/upload-file" className={({ isActive }) => isActive ? "sidebar-item active-link" : "sidebar-item"}>
                Upload File
              </NavLink>
            </li>
          </>
        )}

        {role === 'patient' && (
          <>
            <li>
              <NavLink to="/patient/doctors" className={({ isActive }) => isActive ? "sidebar-item active-link" : "sidebar-item"}>
                Your Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient/appointments" className={({ isActive }) => isActive ? "sidebar-item active-link" : "sidebar-item"}>
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient/appointments/store" className={({ isActive }) => isActive ? "sidebar-item active-link" : "sidebar-item"}>
                Book an Appointment
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
