<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ChangePasswordController extends Controller
{
    public function show()
    {
        return view('auth.passwords.change');
    }

    public function update(Request $request)
    {
        $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = Auth::user(); // Ensure this returns an Eloquent model instance
        if (!$user instanceof \App\Models\User) {
            abort(500, 'Authenticated user is not a valid User model.');
        }
        $user->password = Hash::make($request->password);
        $user->must_change_password = false;
        $user->save();

        return redirect('/')->with('status', 'Contraseña actualizada correctamente.');
    }
}
