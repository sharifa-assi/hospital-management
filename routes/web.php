<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/patient/doctors', function () {
        if (Auth::user()->role !== 'patient') {
            abort(403, 'Unauthorized access.');
        }
        return view('patient.doctors', ['userRole' => Auth::user()->role]);
    })->name('patient.doctors');

    Route::get('/patient/appointments', function () {
        if (Auth::user()->role !== 'patient') {
            abort(403, 'Unauthorized access.');
        }
        return view('patient.appointments', ['userRole' => Auth::user()->role]);
    })->name('patient.appointments');

    Route::get('/doctor/appointments', function () {
        return view('doctor.appointments', ['userRole' => Auth::user()->role]);
    })->name('doctor.appointments');

    Route::get('/doctor/patients', function () {
        return view('doctor.patients', ['userRole' => Auth::user()->role]);
    })->name('doctor.patients');

    Route::get('/doctor/upload', function () {
        return view('doctor.upload', ['userRole' => Auth::user()->role]);
    })->name('doctor.upload');
    Route::get('/admin/doctors', [DashboardController::class, 'getAllDoctors'])->name('admin.allDoctors');

    Route::get('/admin/add-doctor', [DashboardController::class, 'showAddDoctorForm'])->name('admin.addDoctor');

    Route::post('/admin/add-doctor', [DashboardController::class, 'storeNewDoctor'])->name('admin.storeDoctor');

    Route::get('/admin/patients', [DashboardController::class, 'getAllPatients'])->name('admin.allPatients');

    Route::post('logout', function () {
        Auth::logout();
        return redirect()->route('login');
    })->name('logout');
});
