<?php
namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;

class AuthService {

    public function register($email, $password) {
        try {
            $email = User::where('email', $email)->first();

            if ($email) throw new Exception('Email já cadastrado.');

            $user = new User();
            $user->email = $email;
            $user->password = Hash::make($password);

            $user->save();
        } catch (Exception $e) {
            return $e->getMessage();
        }   

        return true;
    }

    public function login($email, $password) {
        
    }

    public function requestPasswordResetLink($email, $token) {

    }

    public function resetPassword($email) {
        
    }
}