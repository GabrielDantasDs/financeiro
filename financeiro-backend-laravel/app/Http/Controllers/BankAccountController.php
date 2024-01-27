<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class BankAccountController extends Controller {

    public function create(Request $request) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100',
            'type' => 'required|in:conta_corrente, conta_pensao',
        ]);

        $bank_account = new BankAccount();
        $bank_account->name = $request->name;
        $bank_account->type = $request->type;
        $bank_account->description = $request->description;

        $bank_account->save();

        return response()->json();
    }

    public function update(Request $request) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100',
            'type' => 'required|in:conta_corrente, conta_pensao',
        ]);

        $bank_account = BankAccount::where([''])->first();
        $bank_account->name = $request->name;
        $bank_account->type = $request->type;
        $bank_account->description = $request->description;

        $bank_account->save();

        return response()->json();
    }
}