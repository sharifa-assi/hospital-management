@extends('layouts.app')

@section('content')
    <div class="container-fluid mt-4">
        <div class="row">
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">
                        <h4>Your Doctors</h4>
                    </div>
                    <div class="card-body">
                        @if($doctors->isEmpty())
                            <p>You have no doctors assigned yet.</p>
                        @else
                            <ul class="list-unstyled">
                                @foreach($doctors as $doctor)
                                    <li class="mb-3">
                                        Dr. {{ $doctor->user->name }} – {{ $doctor->specialty }}
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
