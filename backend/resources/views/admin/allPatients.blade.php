@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>All Patients</h2>

        <form method="GET" action="{{ route('admin.allPatients') }}" class="mb-3">
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Search by name..."
                class="form-control" />
        </form>

        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Patient Name</th>
                    <th>Doctors</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($patients as $patient)
                    <tr>
                        <td>{{ $loop->iteration + ($patients->currentPage() - 1) * $patients->perPage() }}</td>
                        <td>{{ $patient->user->name }}</td>
                        <td>
                            @forelse ($patient->doctors as $doctor)
                                {{ $doctor->user->name }} ({{ $doctor->specialty }})<br>
                            @empty
                                No doctors assigned
                            @endforelse
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3">No patients found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <div class="d-flex justify-content-center">
            {{ $patients->appends(request()->query())->links('pagination::bootstrap-5') }}
        </div>
    </div>
@endsection
