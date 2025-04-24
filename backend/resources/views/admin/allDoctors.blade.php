@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>All Doctors</h2>

        <form method="GET" action="{{ route('admin.allDoctors') }}" class="mb-3">
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Search by name..."
                class="form-control" />
        </form>

        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Doctor Name</th>
                    <th>Specialty</th>
                    <th>Appointments</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($doctors as $doctor)
                    <tr>
                        <td>{{ $loop->iteration + ($doctors->currentPage() - 1) * $doctors->perPage() }}</td>
                        <td>{{ $doctor->user->name }}</td>
                        <td>{{ $doctor->specialty }}</td>
                        <td>
                            @if ($doctor->appointments->count() > 0)
                                <ul>
                                    @foreach ($doctor->appointments as $appointment)
                                        <li>{{ \Carbon\Carbon::parse($appointment->scheduled_at)->format('Y-m-d H:i') }} -
                                            {{ $appointment->status }}</li>
                                    @endforeach
                                </ul>
                            @else
                                No appointments
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4">No doctors found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
        <div class="d-flex justify-content-center">
            {{ $doctors->appends(request()->query())->links('pagination::bootstrap-5') }}

        </div>
    </div>
@endsection
