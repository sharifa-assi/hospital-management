<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientDoctorTable extends Migration
{
    public function up(): void
    {
        Schema::create('patient_doctor', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained('doctors')->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_doctor');
    }
}
