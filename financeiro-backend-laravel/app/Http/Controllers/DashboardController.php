<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller {

    public function get(Request $request) {
        $user = User::where('id', auth()->user()->id)->first();

        return response()->json($user);
    }
}