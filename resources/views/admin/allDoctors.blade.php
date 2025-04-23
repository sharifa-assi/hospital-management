@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>All Doctors</h2>

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
                @foreach ($doctors as $doctor)
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>{{ $doctor->user->name }}</td>
                        <td>{{ $doctor->specialty }}</td>
                        <td>
                            @if ($doctor->appointments->count() > 0)
                                <ul>
                                    @foreach ($doctor->appointments as $appointment)
                                        <li>{{ $appointment->scheduled_at }} - {{ $appointment->status }}</li>
                                    @endforeach
                                </ul>
                            @else
                                No appointments
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
