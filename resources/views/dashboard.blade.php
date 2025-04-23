<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

    @include('partials.navbar')

    <div class="container-fluid mt-4">
        <div class="row">
            @include('partials.sidebar')

            <div class="col-md-9">
                <div id="patient-content" style="display: none;">
                    <div class="card">
                        <div class="card-header">Patient Dashboard</div>
                        <div class="card-body">
                            <h5 class="card-title">Your Doctors</h5>
                            <ul>
                                <li>Doctor 1</li>
                                <li>Doctor 2</li>
                            </ul>
                            <h5 class="card-title">Your Appointments</h5>
                            <ul>
                                <li>Appointment with Doctor 1 on April 30</li>
                                <li>Appointment with Doctor 2 on May 5</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="doctor-content" style="display: none;">
                    <div class="card">
                        <div class="card-header">Doctor Dashboard</div>
                        <div class="card-body">
                            <h5 class="card-title">Your Appointments</h5>
                            <ul>
                                <li>Patient 1 - Appointment on April 30</li>
                                <li>Patient 2 - Appointment on May 5</li>
                            </ul>
                            <h5 class="card-title">Your Patients</h5>
                            <ul>
                                <li>Patient 1</li>
                                <li>Patient 2</li>
                            </ul>
                            <h5 class="card-title">Upload File</h5>
                            <form>
                                <div class="mb-3">
                                    <label for="file-upload" class="form-label">Upload File</label>
                                    <input type="file" class="form-control" id="file-upload">
                                </div>
                                <button type="submit" class="btn btn-primary">Upload</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div id="admin-content" style="display: none;">
                    <div class="card">
                        <div class="card-header">Admin Dashboard</div>
                        <div class="card-body">
                            <h5 class="card-title">All Doctors</h5>
                            <ul>
                                <li>Doctor 1 - Schedule: 9 AM - 5 PM</li>
                                <li>Doctor 2 - Schedule: 10 AM - 6 PM</li>
                            </ul>
                            <h5 class="card-title">Add New Doctor</h5>
                            <form>
                                <div class="mb-3">
                                    <label for="doctor-name" class="form-label">Doctor Name</label>
                                    <input type="text" class="form-control" id="doctor-name">
                                </div>
                                <div class="mb-3">
                                    <label for="doctor-schedule" class="form-label">Schedule</label>
                                    <input type="text" class="form-control" id="doctor-schedule">
                                </div>
                                <button type="submit" class="btn btn-success">Add Doctor</button>
                            </form>
                            <h5 class="card-title mt-4">All Patients</h5>
                            <ul>
                                <li>Patient 1</li>
                                <li>Patient 2</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>
