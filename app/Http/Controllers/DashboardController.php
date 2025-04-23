<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return view('dashboard', ['userRole' => $user->role]);
    }

    public function getAllDoctors(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $search = $request->query('search');

        $doctors = Doctor::with(['user', 'appointments'])
            ->when($search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            })
            ->paginate(5);

        return view('admin.allDoctors', [
            'doctors' => $doctors,
            'search' => $search,
            'userRole' => Auth::user()->role,
        ]);
    }

    public function showAddDoctorForm()
    {
        $userRole = Auth::user()->role;

        return view('admin.addDoctor', compact('userRole'));
    }

    public function storeNewDoctor(Request $request)
    {
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

        return redirect()->route('admin.allDoctors')->with('success', 'Doctor added successfully!');
    }

    public function getAllPatients(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $query = Patient::with(['user', 'doctors.user']);

        if ($request->has('search')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        }

        $patients = $query->paginate(10);

        return view('admin.allPatients', [
            'patients' => $patients,
            'userRole' => Auth::user()->role,
        ]);
    }


    public function getMyDoctors()
    {
        $user = Auth::user();

        if ($user->role !== 'patient') {
            abort(403, 'Unauthorized');
        }

        $patient = Patient::where('user_id', $user->id)->first();

        if (!$patient) {
            abort(404, 'Patient not found.');
        }

        $doctors = $patient->doctors()->with('user')->get();

        return view('patient.doctors', [
            'doctors' => $doctors,
            'userRole' => $user->role,
        ]);
    }

    public function getMyAppointments()
    {
        $user = Auth::user();

        if ($user->role !== 'patient') {
            abort(403, 'Unauthorized');
        }

        $patient = Patient::where('user_id', $user->id)->first();

        if (!$patient) {
            abort(404, 'Patient not found.');
        }

        $appointments = $patient
            ->appointments()
            ->with(['doctor.user'])
            ->orderBy('scheduled_at')
            ->get();

        return view('patient.appointments', [
            'appointments' => $appointments,
            'userRole' => $user->role,
        ]);
    }

    public function createAppointment(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'scheduled_at' => 'required|date|after:now',
        ]);

        $patient = Patient::where('user_id', Auth::id())->first();

        if (!$patient) {
            abort(403, 'Unauthorized access. Patient not found.');
        }

        $doctor = Doctor::find($request->doctor_id);

        if (!$doctor) {
            abort(404, 'Doctor not found.');
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

        return redirect()->route('patient.appointments')->with('success', 'Appointment created successfully!');
    }

    public function createAppointmentForm()
    {
        $user = Auth::user();

        if ($user->role !== 'patient') {
            abort(403, 'Unauthorized');
        }

        $doctors = Doctor::all();

        return view('patient.createAppointment', [
            'doctors' => $doctors,
            'userRole' => $user->role,
        ]);
    }

    public function getMyAppointmentsForDoctor()
    {
        $user = Auth::user();

        if ($user->role !== 'doctor') {
            abort(403, 'Unauthorized access. Only doctors can view their appointments.');
        }

        $doctor = Doctor::where('user_id', $user->id)->first();

        if (!$doctor) {
            abort(404, 'Doctor not found.');
        }

        $appointments = Appointment::where('doctor_id', $doctor->id)
            ->with(['patient.user'])
            ->orderBy('scheduled_at')
            ->get();

        return view('doctor.appointments', [
            'appointments' => $appointments,
            'userRole' => $user->role,
        ]);
    }

    public function updateAppointmentStatus($appointmentId)
    {
        $appointment = Appointment::findOrFail($appointmentId);

        $user = Auth::user();
        if ($user->role !== 'doctor') {
            abort(403, 'Unauthorized');
        }

        if ($appointment->status == 'scheduled') {
            $appointment->status = 'completed';
        } elseif ($appointment->status == 'completed') {
            $appointment->status = 'canceled';
        } else {
            $appointment->status = 'scheduled';
        }

        $appointment->save();

        return redirect()->back()->with('success', 'Appointment status updated successfully!');
    }

    public function getMyPatients()
    {
        $user = Auth::user();

        if ($user->role !== 'doctor') {
            abort(403, 'Unauthorized access. Only doctors can view their patients.');
        }

        $doctor = Doctor::where('user_id', $user->id)->first();

        if (!$doctor) {
            abort(404, 'Doctor not found.');
        }

        $patients = Patient::whereHas('appointments', function ($query) use ($doctor) {
            $query->where('doctor_id', $doctor->id);
        })
            ->with('user')
            ->get();

        return view('doctor.patients', [
            'patients' => $patients,
            'userRole' => $user->role,
        ]);
    }
}
