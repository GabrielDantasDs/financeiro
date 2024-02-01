<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CostCenter;
use App\Models\FinancialTransaction;
use App\Models\PaymentCondition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentConditionController extends Controller
{
    public function create(Request $request) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100'
        ]);

        $payment_condition = new PaymentCondition();
        $payment_condition->installment = $request->installment;
        $payment_condition->method = $request->method;
        $payment_condition->paid = $request->paid;
        $payment_condition->id_bank_account = $request->id_bank_account;
        
        $payment_condition->save();

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
