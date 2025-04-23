<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Doctor;
use Carbon\Carbon;

class AppointmentsSeeder extends Seeder
{
    public function run()
    {
        $patients = Patient::all();
        $doctors = Doctor::all();

        if ($patients->isEmpty() || $doctors->isEmpty()) {
            $this->command->info('There are no patients or doctors to create appointments.');
            return;
        }

        foreach ($patients as $patient) {
            $doctor = $doctors->random();
            $scheduledAt = Carbon::now()->addDays(rand(1, 30))->setTime(rand(9, 17), rand(0, 59));

            Appointment::create([
                'patient_id' => $patient->id,
                'doctor_id' => $doctor->id,
                'scheduled_at' => $scheduledAt,
                'status' => 'scheduled',
            ]);
        }

        $this->command->info('Appointments created successfully!');
    }
}
