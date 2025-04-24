<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date_of_birth',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'patient_doctor', 'patient_id', 'doctor_id');
    }
}
