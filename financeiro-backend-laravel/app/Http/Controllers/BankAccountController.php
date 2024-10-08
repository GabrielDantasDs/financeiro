<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class BankAccountController extends Controller {

    public function create(Request $request) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100',
            'type' => 'required|in:conta_corrente, poupanca',
        ]);

        $bank_account = new BankAccount();
        $bank_account->name = $request->name;
        $bank_account->type = $request->type;
        $bank_account->description = $request->description;
        $bank_account->id_subscriber = $request->id_subscriber;

        $bank_account->save();

        return response()->json();
    }

    public function update(Request $request) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100',
            'type' => 'required|in:conta_corrente, poupanca',
        ]);

        $bank_account = BankAccount::where([''])->first();
        $bank_account->name = $request->name;
        $bank_account->type = $request->type;
        $bank_account->description = $request->description;

        $bank_account->save();

        return response()->json();
    }

    public function get(Request $request, $id) {
        $bank_account = BankAccount::where('id', $id)->firstOrFail();

        return response()->json($bank_account);
    }

    public function list(Request $request, $id) {
        $bank_account = BankAccount::select(DB::raw('id, name, type'))->where('id_subscriber', $id)->paginate(15);

        return response()->json($bank_account);
    }

    public function delete(Request $request, $id) {
        BankAccount::where('id', $id)->delete();

        return response()->json();
    }
}