<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;
use App\Models\User;
use Faker\Factory as Faker;

class PatientSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 50; $i++) {
            $user = User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password'),
            ]);

            Patient::create([
                'user_id' => $user->id,
                'date_of_birth' => $faker->date(),
            ]);
        }
    }
}
