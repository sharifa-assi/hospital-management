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

    public function getAllDoctors()
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $doctors = Doctor::with('user', 'appointments')->get();

        return view('admin.allDoctors', [
            'doctors' => $doctors,
            'userRole' => Auth::user()->role
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

    public function getAllPatients()
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $patients = Patient::with(['user', 'doctors'])->get();

        return view('admin.allPatients', [
            'patients' => $patients,
            'userRole' => Auth::user()->role
        ]);
    }

}
