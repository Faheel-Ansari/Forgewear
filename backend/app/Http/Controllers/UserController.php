<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getUser()
    {
        $user = Auth::user();
        if ($user) {
            return response()->json([
                'status' => true,
                'user' => $user,
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'something went wrong',
            ], 401);
        }
    }

    public function profileUpdate(Request $req)
    {
        // return $req;
        $validadtion = Validator::make(
            $req->all(),
            [
                'name' => 'required|string|max:100',
                'password' => 'nullable|string|max:12|min:8|confirmed',
            ],
            [
                'password.confirmed' => 'Password confirmation does not match!'
            ]
        );

        if ($validadtion->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validadtion->errors()
            ], 422);
        }

        $user = User::find($req->id);

        $user->name = $req->name;
        if ($user->email !== $req->email) {
            $user->email = $req->email;
        }
        if ($req->password !== null) {
            $user->password = Hash::make($req->password);
        }
        if (!empty($req->file('photo'))) {
            $filePath = public_path() . '/uploads/userImages/' . $user->photo;
            if ($user->photo && file_exists($filePath)) {
                unlink($filePath);
            }
            $file = $req->file('photo');
            $fileName = time() . md5($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path() . '/uploads/userImages', $fileName);
            $user->photo = $fileName;
        }
        $user->save();
        
        return response()->json([
            'status' => true,
            'user' => $user->fresh(),
            'message' => 'user updated successfully'
        ], 200);
    }
}
