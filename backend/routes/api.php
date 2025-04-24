<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:api')->group(function () {
    // Patient routes
    Route::get('/patient/doctors', [DashboardController::class, 'getMyDoctors']);
    Route::get('/patient/appointments', [DashboardController::class, 'getMyAppointments']);
    Route::post('/patient/appointments/store', [DashboardController::class, 'createAppointment']);

    // Doctor routes
    Route::get('/doctor/appointments', [DashboardController::class, 'getMyAppointmentsForDoctor']);
    Route::put('/appointments/{appointment}/status', [DashboardController::class, 'updateAppointmentStatus']);
    Route::get('/doctor/patients', [DashboardController::class, 'getMyPatients']);

    // Admin routes
    Route::get('/admin/doctors', [DashboardController::class, 'getAllDoctors']);
    Route::post('/admin/add-doctor', [DashboardController::class, 'storeNewDoctor']);
    Route::get('/admin/patients', [DashboardController::class, 'getAllPatients']);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
});
