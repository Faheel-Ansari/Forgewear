<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\signupemail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function verifyLogin()
    {
        $user = Auth::user();
        return response()->json([
            'status' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'photo' => $user->photo,
                'role' => $user->role,
                'email' => $user->email,
            ],
            'message' => 'user is authorized'
        ], 200);
    }

    public function signUp(Request $req)
    {
        // 1. Create a throttle key based on the visitor's IP address
        $throttleKey = 'signup|' . $req->ip();

        // 2. Check if they hit the limit (e.g., max 3 signups/attempts per 2 minutes)
        if (RateLimiter::tooManyAttempts($throttleKey, 1)) {
            $seconds = RateLimiter::availableIn($throttleKey);

            return response()->json([
                'status' => false,
                'message' => "Too many registration attempts. Please try again in {$seconds} seconds."
            ], 429);
        }

        $validation = Validator::make($req->all(), [
            'name' => 'string|required',
            'email' => 'email|required|unique:users,email',
            'password' => 'string|required|min:8|max:12|confirmed',
        ]);

        if ($validation->fails()) {
            RateLimiter::hit($throttleKey, 120);

            return response()->json([
                'status' => false,
                'message' => $validation->messages()
            ], 200);
        }

        $user = User::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password),
        ]);

        Auth::login($user);

        $authUser = Auth::user();

        if ($authUser) {
            RateLimiter::hit($throttleKey, 120);

            Mail::to($authUser->email)->send(new signupemail());

            return response()->json([
                'status' => true,
                'message' => 'User created successfully',
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!'
            ]);
        }
    }

    public function login(Request $req)
    {
        $throttleKey = Str::transliterate(Str::lower($req->input('email')) . '|' . $req->ip());

        // 2. Check if the user has exceeded the rate limit (e.g., 5 attempts per minute)
        if (RateLimiter::tooManyAttempts($throttleKey, 2)) {
            $seconds = RateLimiter::availableIn($throttleKey);

            return response()->json([
                'status' => false,
                'message' => "Too many login attempts. Please try again in {$seconds} seconds."
            ], 429);
        }

        $validation = Validator::make($req->all(), [
            'email' => 'email|required',
            'password' => 'string|required|min:8|max:12',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validation->messages()
            ], 422);
        }

        if (Auth::attempt(['email' => $req->email, 'password' => $req->password])) {

            RateLimiter::clear($throttleKey);

            return response()->json([
                'status' => true,
                'message' => 'You Logged in successfully.'
            ], 200);
        } else {

            RateLimiter::hit($throttleKey, 120);

            return response()->json([
                'status' => false,
                'message' => 'Credentials failed!'
            ], 401);
        }
    }

    public function logout(Request $req)
    {
        Auth::logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();

        return response()->json([
            'status' => true,
            'message' => 'you logged out successfully!'
        ], 200);
    }
}
