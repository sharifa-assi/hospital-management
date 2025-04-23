@extends('layouts.app')

@section('content')
    <div class="container-fluid mt-4">
        <div class="row">
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">
                        <h4>Book an Appointment</h4>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('patient.appointments.store') }}" method="POST">
                            @csrf
                            <div class="form-group">
                                <label for="doctor_id">Select Doctor</label>
                                <select name="doctor_id" id="doctor_id" class="form-control" required>
                                    @foreach ($doctors as $doctor)
                                        <option value="{{ $doctor->id }}">{{ $doctor->user->name }} –
                                            {{ $doctor->specialty }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group mt-3">
                                <label for="scheduled_at">Appointment Date & Time</label>
                                <input type="datetime-local" name="scheduled_at" id="scheduled_at" class="form-control"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary mt-3">Book Appointment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
