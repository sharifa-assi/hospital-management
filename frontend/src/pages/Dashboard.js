import React from 'react';
import './dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
      <p className="dashboard-description">
        Manage your appointments, track your patients, and streamline your workflow efficiently.
      </p>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>For Healthcare Professionals</h3>
          <p>Seamlessly manage your appointments, patient records, and consults, all in one place.</p>
        </div>
        <div className="dashboard-card">
          <h3>For Patients</h3>
          <p>Book, track, and manage your medical appointments with ease, ensuring timely care and attention.</p>
        </div>
        <div className="dashboard-card">
          <h3>Appointment Management</h3>
          <p>Efficiently organize, schedule, and review appointments, creating a smooth experience for both doctors and patients.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
