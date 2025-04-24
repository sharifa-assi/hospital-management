import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import './uploadFile.css';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [patientId, setPatientId] = useState('');
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/doctor/patients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(response.data);
      } catch (err) {
        console.error('Error fetching patients:', err);
      }
    };

    fetchPatients();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setError('');
    setSuccessMessage('');
  };

  const handlePatientIdChange = (event) => {
    setPatientId(event.target.value);
  };

  const handleUpload = async () => {
    if (!file || !patientId) {
      setError('Please select a file and a patient');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('patient_id', patientId);

    try {
      const response = await axios.post('/doctor/upload-file', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('File uploaded successfully!');
      setError('');
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('File upload failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-container">
      <h2>Upload File</h2>
      <form className="form">
        {error && <div className="message error">{error}</div>}
        {successMessage && <div className="message success">{successMessage}</div>}

        <div className="form-group">
          <label htmlFor="patient">Select Patient:</label>
          <select
            id="patient"
            value={patientId}
            onChange={handlePatientIdChange}
            className="form-input"
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="file">Select File:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>

        <button type="button" onClick={handleUpload} className="submit-btn">
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadFile;
