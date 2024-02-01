<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CostCenter;
use App\Models\FinancialTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InstallmentController extends Controller
{
    public function create(Request $request) {
        $validated = $request->validate([
            'type' => 'required|min:3|max:100',
            'value' => 'required|decimal',
            'payment_day' => 'required|date',
        ]);

        $financial_transaction = new FinancialTransaction();
        $financial_transaction->value = $request->value;
        $financial_transaction->paid = $request->paid;
        $financial_transaction->payment_day = $request->payment_day;
        $financial_transaction->due_day = $request->due_day;
        
        $financial_transaction->save();

        return response()->json();
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100'
        ]);

        $financial_transaction = FinancialTransaction::where('id', $id)->firstOrFail();

        $financial_transaction->type = $request->type;
        $financial_transaction->value = $request->value;
        $financial_transaction->note = $request->note;
        $financial_transaction->invoice_date = $request->invoice_date;
        $financial_transaction->paid = $request->paid;
        $financial_transaction->payment_day = $request->payment_day;
        $financial_transaction->periodicity = $request->periodicity;
        $financial_transaction->periodicity_type = $request->periodicity_type;
        $financial_transaction->id_subscriber = $request->id_subscriber;
        
        $financial_transaction->save();

        return response()->json();
    }

    public function get(Request $request, $id) {
        $financial_transaction = FinancialTransaction::where('id', $id)->firstOrFail();

        return response()->json($financial_transaction);
    }

    public function list(Request $request) {
        $financial_transaction = FinancialTransaction::select(DB::raw('id, name'))->where('id', $request->id_subscriber)->paginate(10);

        return response()->json($financial_transaction);
    }

    public function delete(Request $request, $id) { 
        FinancialTransaction::where('id', $id)->delete();

        return response()->json();   
    }
}
