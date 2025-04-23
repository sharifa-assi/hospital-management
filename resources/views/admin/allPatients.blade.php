@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>All Patients</h2>

        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Patient Name</th>
                    <th>Doctors</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($patients as $patient)
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>{{ $patient->user->name }}</td>
                        <td>
                            @foreach ($patient->doctors as $doctor)
                                {{ $doctor->user->name }} ({{ $doctor->specialty }})<br>
                            @endforeach
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
