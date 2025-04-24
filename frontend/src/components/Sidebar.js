import { Link, NavLink } from 'react-router-dom';

function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  return (
    <div style={styles.sidebar}>
      <ul style={styles.sidebarList}>
        {role === 'admin' && (
          <>
            <li>
              <NavLink to="/admin/doctors" style={styles.sidebarItem} activeClassName="active-link">
                All Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/add-doctor" style={styles.sidebarItem} activeClassName="active-link">
                Add Doctor
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/patients" style={styles.sidebarItem} activeClassName="active-link">
                All Patients
              </NavLink>
            </li>
          </>
        )}

        {role === 'doctor' && (
          <>
            <li>
              <NavLink to="/doctor/appointments" style={styles.sidebarItem} activeClassName="active-link">
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor/patients" style={styles.sidebarItem} activeClassName="active-link">
                Your Patients
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor/upload-file" style={styles.sidebarItem} activeClassName="active-link">
                Upload File
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor/view-file" style={styles.sidebarItem} activeClassName="active-link">
                View Files
              </NavLink>
            </li>
          </>
        )}

        {role === 'patient' && (
          <>
            <li>
              <NavLink to="/patient/doctors" style={styles.sidebarItem} activeClassName="active-link">
                Your Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient/appointments" style={styles.sidebarItem} activeClassName="active-link">
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient/appointments/store" style={styles.sidebarItem} activeClassName="active-link">
                Book an Appointment
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient/view-file" style={styles.sidebarItem} activeClassName="active-link">
                View Files
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#333',
    position: 'fixed',
    top: 60,
    left: 0,
    height: '100%',
    paddingTop: '20px',
  },
  sidebarList: {
    listStyleType: 'none',
    padding: '0',
  },
  sidebarItem: {
    color: '#fff',
    padding: '10px 20px',
    display: 'block',
    textDecoration: 'none',
  },
};

export default Sidebar;
