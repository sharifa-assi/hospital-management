@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>My Appointments</h2>

        @if ($appointments->isEmpty())
            <p>No appointments scheduled.</p>
        @else
            <table class="table">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Appointment Date</th>
                        <th>Status</th>
                        <th>Action</th> <!-- Add a new column for the action button -->
                    </tr>
                </thead>
                <tbody>
                    @foreach ($appointments as $appointment)
                        <tr>
                            <td>{{ $appointment->patient->user->name }}</td>
                            <td>{{ $appointment->scheduled_at->format('Y-m-d H:i') }}</td>
                            <td>{{ ucfirst($appointment->status) }}</td>
                            <td>
                                <!-- Button to change the status -->
                                <form action="{{ route('doctor.updateStatus', $appointment->id) }}" method="POST"
                                    style="display:inline;">
                                    @csrf
                                    @method('PUT')
                                    <button type="submit" class="btn btn-warning">
                                        @if ($appointment->status == 'scheduled')
                                            Mark as Completed
                                        @elseif($appointment->status == 'completed')
                                            Mark as Canceled
                                        @else
                                            Reschedule
                                        @endif
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>
@endsection
