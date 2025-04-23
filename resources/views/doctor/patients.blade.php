@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>My Patients</h2>

        @if ($patients->isEmpty())
            <p>No patients found.</p>
        @else
            <table class="table">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($patients as $patient)
                        <tr>
                            <td>{{ $patient->user->name }}</td>
                            <td>{{ $patient->user->email }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>
@endsection
