<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'specialty',
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

    public function patients()
    {
        return $this->belongsToMany(Patient::class, 'patient_doctor', 'doctor_id', 'patient_id');
    }

}
