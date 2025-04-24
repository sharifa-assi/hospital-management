<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Support\Str;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        $requiredUsers = 50;
        $currentUserCount = User::count();
        if ($currentUserCount < $requiredUsers) {
            User::factory()->count($requiredUsers - $currentUserCount)->create();
        }

        $users = User::inRandomOrder()->take(50)->get();

        $specialties = [
            'Cardiology',
            'Neurology',
            'Pediatrics',
            'Dermatology',
            'Orthopedics',
            'Ophthalmology',
            'Psychiatry',
            'Radiology',
            'Oncology',
            'Urology',
            'Gastroenterology',
            'Endocrinology',
            'Hematology',
            'Nephrology',
            'Rheumatology',
            'Pulmonology',
            'Anesthesiology',
            'General Surgery',
            'Plastic Surgery',
            'ENT (Otolaryngology)',
        ];

        foreach ($users as $user) {
            Doctor::create([
                'user_id' => $user->id,
                'specialty' => $specialties[array_rand($specialties)],
            ]);
        }
    }
}
