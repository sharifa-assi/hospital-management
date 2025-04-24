<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Support\Facades\DB;

class PatientDoctorSeeder extends Seeder
{
    public function run()
    {
        $patients = Patient::all();
        $doctors = Doctor::all();

        if ($patients->isNotEmpty() && $doctors->isNotEmpty()) {
            foreach ($patients as $patient) {
                $randomDoctors = $doctors->random(rand(1, 3));

                foreach ($randomDoctors as $doctor) {
                    DB::table('patient_doctor')->insert([
                        'patient_id' => $patient->id,
                        'doctor_id' => $doctor->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}
