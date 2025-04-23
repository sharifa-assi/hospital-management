<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class PatientDoctor extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'doctor_id',
    ];
}
