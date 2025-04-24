import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <ul style={styles.sidebarList}>
        <li><Link to="/admin/doctors" style={styles.sidebarItem}>All Doctors</Link></li>
        <li><Link to="/admin/add-doctor" style={styles.sidebarItem}>Add Doctor</Link></li>
        <li><Link to="/admin/patients" style={styles.sidebarItem}>All Patients</Link></li>

        <li><Link to="/doctor/appointments" style={styles.sidebarItem}>Appointments</Link></li>
        <li><Link to="/doctor/patients" style={styles.sidebarItem}>Your Patients</Link></li>

        <li><Link to="/patient/doctors" style={styles.sidebarItem}>Your Doctors</Link></li>
        <li><Link to="/patient/appointments" style={styles.sidebarItem}>Appointments</Link></li>
        <li><Link to="/patient/appointments/store" style={styles.sidebarItem}>Book an Appointment</Link></li>
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
