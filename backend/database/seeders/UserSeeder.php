<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Doctor;
use App\Models\Patient;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        $patientUser = User::updateOrCreate(
            ['email' => 'patient@example.com'],
            [
                'name' => 'Patient User',
                'password' => Hash::make('password'),
                'role' => 'patient',
            ]
        );

        Patient::updateOrCreate(
            ['user_id' => $patientUser->id],
            ['date_of_birth' => '1985-05-14']
        );

        $doctorUser = User::updateOrCreate(
            ['email' => 'doctor@example.com'],
            [
                'name' => 'Doctor User',
                'password' => Hash::make('password'),
                'role' => 'doctor',
            ]
        );

        Doctor::updateOrCreate(
            ['user_id' => $doctorUser->id],
            ['specialty' => 'Cardiology']
        );
    }
}
