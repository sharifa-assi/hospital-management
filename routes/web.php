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

    Route::get('/patient/doctors', [DashboardController::class, 'getMyDoctors'])
        ->middleware('auth')
        ->name('patient.doctors');

    Route::get('/patient/appointments', [DashboardController::class, 'getMyAppointments'])
        ->middleware('auth')
        ->name('patient.appointments');

    Route::get('/patient/appointments/create', [DashboardController::class, 'createAppointmentForm'])->name('patient.appointments.create.form');

    Route::post('/patient/appointments/store', [DashboardController::class, 'createAppointment'])->name('patient.appointments.store');

    Route::middleware(['auth'])
        ->get('/doctor/appointments', [DashboardController::class, 'getMyAppointmentsForDoctor'])
        ->name('doctor.appointments');

    Route::put('/appointments/{appointment}/status', [DashboardController::class, 'updateAppointmentStatus'])->name('doctor.updateStatus');

    Route::get('/doctor/patients', [DashboardController::class, 'getMyPatients'])->name('doctor.patients');

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
