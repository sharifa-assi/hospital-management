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
              <NavLink to="/admin/doctors" className="sidebar-item" activeClassName="active-link">
                All Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/add-doctor" className="sidebar-item" activeClassName="active-link">
                Add Doctor
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/patients" className="sidebar-item" activeClassName="active-link">
                All Patients
              </NavLink>
            </li>
          </>
        )}

        {role === 'doctor' && (
          <>
            <li>
              <NavLink to="/doctor/appointments" className="sidebar-item" activeClassName="active-link">
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor/patients" className="sidebar-item" activeClassName="active-link">
                Your Patients
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor/upload-file" className="sidebar-item" activeClassName="active-link">
                Upload File
              </NavLink>
            </li>
          </>
        )}

        {role === 'patient' && (
          <>
            <li>
              <NavLink to="/patient/doctors" className="sidebar-item" activeClassName="active-link">
                Your Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient/appointments" className="sidebar-item" activeClassName="active-link">
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient/appointments/store" className="sidebar-item" activeClassName="active-link">
                Book an Appointment
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient/view-file" className="sidebar-item" activeClassName="active-link">
                View Files
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
