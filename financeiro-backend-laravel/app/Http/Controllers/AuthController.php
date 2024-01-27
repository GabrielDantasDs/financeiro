<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {

    public function register(Request $request) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:32',
            'email' => 'required|unique:users|max:255',
            'password' => 'required|min:8',
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();
    }

    public function login(Request $request) {
        $validated = $request->validate([
            'email' => 'required',
            'password' => 'required|min:8',
        ]);

        $user = User::where(['email' => $request->email])->first();

        if (Hash::check($request->password, $user->password)) {
            $token = $user->createToken('access_token');
            
            return response()->json($token->plainTextToken);
        } 
    }

    public function requestPasswordResetLink(Request $request) {

    }

    public function resetPassword(Request $request) {
        
    }
}