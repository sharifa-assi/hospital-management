<div class="col-md-3">
    <div class="list-group" id="sidebar-links">

        @if ($userRole == 'patient')
            <a href="{{ route('patient.doctors') }}" class="list-group-item list-group-item-action active">Your
                Doctors</a>
            <a href="{{ route('patient.appointments') }}" class="list-group-item list-group-item-action">Your
                Appointments</a>
        @elseif($userRole == 'doctor')
            <a href="{{ route('doctor.appointments') }}" class="list-group-item list-group-item-action active">Your
                Appointments</a>
            <a href="{{ route('doctor.patients') }}" class="list-group-item list-group-item-action">Your Patients</a>
            <a href="{{ route('doctor.upload') }}" class="list-group-item list-group-item-action">Upload File</a>
        @elseif($userRole == 'admin')
            <a href="{{ route('admin.allDoctors') }}" class="list-group-item list-group-item-action active">All
                Doctors</a>
            <a href="{{ route('admin.addDoctor') }}" class="list-group-item list-group-item-action">Add New Doctor</a>
            <a href="{{ route('admin.allPatients') }}" class="list-group-item list-group-item-action">All Patients</a>
        @endif
    </div>
</div>
