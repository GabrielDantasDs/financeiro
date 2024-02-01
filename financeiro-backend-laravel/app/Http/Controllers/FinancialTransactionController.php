<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CostCenter;
use App\Models\FinancialTransaction;
use App\Models\Installment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FinancialTransactionController extends Controller
{
    public function create(Request $request) {
        $validated = $request->validate([
            'value' => 'required|decimal',
            'type' => 'required|max:32',
            'invoice_date' => 'required|date',
            'payment_day' => 'required|date',
            'periodicity' => 'required|max:32',
            'periodicity_type' => 'required|max:32',
            'id_subscriber' => 'required' 
        ]);

        $financial_transaction = new FinancialTransaction();
        $financial_transaction = $request->value;
        $financial_transaction = $request->type;
        $financial_transaction = $request->invoice_date;
        $financial_transaction = $request->paid;
        $financial_transaction = $request->payment_day;
        $financial_transaction = $request->periodicity;
        $financial_transaction = $request->periodicity_type;
        $financial_transaction = $request->id_subscriber;
        
        $financial_transaction->save();

        return response()->json();
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'value' => 'required|decimal',
            'type' => 'required|max:32',
            'invoice_date' => 'required|date',
            'payment_day' => 'required|date',
            'periodicity' => 'required|max:32',
            'periodicity_type' => 'required|max:32',
            'id_subscriber' => 'required' 
        ]);

        $financial_transaction = FinancialTransaction::where('id', $id)->firstOrFail();
        $financial_transaction = $request->value;
        $financial_transaction = $request->type;
        $financial_transaction = $request->invoice_date;
        $financial_transaction = $request->paid;
        $financial_transaction = $request->payment_day;
        $financial_transaction = $request->periodicity;
        $financial_transaction = $request->periodicity_type;
        $financial_transaction = $request->id_subscriber;
        
        $financial_transaction->save();

        return response()->json();
    }

    public function get(Request $request, $id) {
        $financial_transaction = FinancialTransaction::where('id', $id)->firstOrFail();

        return response()->json($financial_transaction);
    }

    public function list(Request $request) {
        $financial_transaction = FinancialTransaction::select(DB::raw('id, value, number'))->paginate(10);

        return response()->json($financial_transaction);
    }

    public function delete(Request $request, $id) { 
        FinancialTransaction::where('id', $id)->delete();

        return response()->json();   
    }
}
