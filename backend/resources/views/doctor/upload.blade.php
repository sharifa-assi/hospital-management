@extends('layouts.app')

@section('content')
    <div class="card">
        <div class="card-header">Upload File</div>
        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label for="file-upload" class="form-label">Upload File</label>
                    <input type="file" class="form-control" id="file-upload">
                </div>
                <button type="submit" class="btn btn-primary">Upload</button>
            </form>
        </div>
    </div>
@endsection
