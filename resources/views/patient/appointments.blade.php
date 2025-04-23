@extends('layouts.app')

@section('content')
    <div class="container-fluid mt-4">
        <div class="row">
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">
                        <h4>Your Appointments</h4>
                    </div>
                    <div class="card-body">
                        @if($appointments->isEmpty())
                            <p>You have no appointments scheduled yet.</p>
                        @else
                            <ul class="list-unstyled">
                                @foreach($appointments as $appointment)
                                    <li class="mb-3">
                                        <strong>{{ \Carbon\Carbon::parse($appointment->scheduled_at)->format('F j') }}</strong>
                                        – Dr. {{ $appointment->doctor->user->name }}
                                        at <strong>{{ \Carbon\Carbon::parse($appointment->scheduled_at)->format('g:i A') }}</strong>
                                    </li>
                                @endforeach
                            </ul>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
