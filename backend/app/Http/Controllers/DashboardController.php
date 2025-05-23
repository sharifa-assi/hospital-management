<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\File;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return response()->json([
            'userRole' => $user->role
        ]);
    }

    public function getAllDoctors(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $search = $request->query('search');
        $doctors = Doctor::with(['user', 'appointments.patient.user'])
            ->when($search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            })
            ->get();

        return response()->json($doctors);
    }

    public function showAddDoctorForm()
    {
        $userRole = Auth::user()->role;
        return response()->json(['userRole' => $userRole]);
    }

    public function storeNewDoctor(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
                'specialty' => 'required|string|max:255',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            Doctor::create([
                'user_id' => $user->id,
                'specialty' => $request->specialty,
            ]);

            return response()->json(['message' => 'Doctor added successfully!'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getAllPatients(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $query = Patient::with(['user', 'doctors.user']);

        if ($request->has('search')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        }

        $patients = $query->get();
        return response()->json($patients);
    }

    public function getMyDoctors()
    {
        $user = Auth::user();

        if ($user->role !== 'patient') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $patient = Patient::where('user_id', $user->id)->first();

        if (!$patient) {
            return response()->json(['error' => 'Patient not found.'], 404);
        }

        $doctors = $patient->doctors()->with('user')->get();
        return response()->json($doctors);
    }

    public function getMyAppointments()
    {
        $user = Auth::user();

        if ($user->role !== 'patient') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $patient = Patient::where('user_id', $user->id)->first();

        if (!$patient) {
            return response()->json(['error' => 'Patient not found.'], 404);
        }

        $appointments = $patient->appointments()
            ->with(['doctor.user'])
            ->orderBy('scheduled_at')
            ->get();

        return response()->json($appointments);
    }

    public function createAppointment(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'scheduled_at' => 'required|date|after:now',
        ]);

        $patient = Patient::where('user_id', Auth::id())->first();

        if (!$patient) {
            return response()->json(['error' => 'Unauthorized access. Patient not found.'], 403);
        }

        $doctor = Doctor::find($request->doctor_id);

        if (!$doctor) {
            return response()->json(['error' => 'Doctor not found.'], 404);
        }

        if (!$patient->doctors->contains($doctor)) {
            $patient->doctors()->attach($doctor->id);
        }

        Appointment::create([
            'patient_id' => $patient->id,
            'doctor_id' => $doctor->id,
            'scheduled_at' => $request->scheduled_at,
            'status' => 'scheduled',
        ]);

        return response()->json(['message' => 'Appointment created successfully!'], 201);
    }

    public function getMyAppointmentsForDoctor()
    {
        $user = Auth::user();

        if ($user->role !== 'doctor') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $doctor = Doctor::where('user_id', $user->id)->first();

        if (!$doctor) {
            return response()->json(['error' => 'Doctor not found.'], 404);
        }

        $appointments = Appointment::where('doctor_id', $doctor->id)
            ->with(['patient.user'])
            ->orderBy('scheduled_at')
            ->get();

        return response()->json($appointments);
    }

    public function updateAppointmentStatus($appointmentId)
    {
        $appointment = Appointment::findOrFail($appointmentId);

        $user = Auth::user();
        if ($user->role !== 'doctor') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $newStatus = request()->input('status');

        if (!in_array($newStatus, ['scheduled', 'completed', 'canceled'])) {
            return response()->json(['error' => 'Invalid status'], 400);
        }
        $appointment->status = $newStatus;

        $appointment->save();

        return response()->json([
            'message' => 'Appointment status updated successfully!',
            'appointment' => $appointment
        ]);
    }

    public function getMyPatients()
    {
        $user = Auth::user();

        if ($user->role !== 'doctor') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $doctor = Doctor::where('user_id', $user->id)->first();

        if (!$doctor) {
            return response()->json(['error' => 'Doctor not found.'], 404);
        }

        $patients = Patient::whereHas('appointments', function ($query) use ($doctor) {
            $query->where('doctor_id', $doctor->id);
        })
            ->with(['user', 'files'])
            ->get();

        return response()->json($patients);
    }

    public function getAllDoctorsForPatients()
    {
        $doctors = Doctor::with('user')->get();
        return response()->json($doctors);
    }

    public function uploadFile(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'file' => 'required|file|max:10240',
        ]);

        $user = Auth::user();

        if ($user->role !== 'doctor') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $doctor = Doctor::where('user_id', $user->id)->first();
        if (!$doctor) {
            return response()->json(['error' => 'Doctor not found'], 404);
        }

        $file = $request->file('file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('public/uploads', $filename);

        File::create([
            'doctor_id' => $doctor->id,
            'patient_id' => $request->patient_id,
            'filename' => $filename,
            'path' => $path,
            'uploaded_at' => Carbon::now(),
        ]);

        return response()->json(['message' => 'File uploaded successfully']);
    }

    public function viewFile($id)
    {
        $file = File::find($id);

        if (!$file) {
            return response()->json(['error' => 'File not found.'], 404);
        }

        $path = $file->path;

        if (!Storage::exists($path)) {
            return response()->json(['error' => 'File not found on server.'], 404);
        }

        return Storage::download($path, $file->filename);
    }

}
