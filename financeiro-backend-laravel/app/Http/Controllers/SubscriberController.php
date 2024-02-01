<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CostCenter;
use App\Models\FinancialTransaction;
use App\Models\PaymentCondition;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubscriberController extends Controller
{
    public function create(Request $request) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100',
            'document' => 'required|min:3|max:20',
            'email' => 'required|email|unique:subscribers,email',
            'distrcit' => 'required|max:255',
            'number' => 'required|max:5',
            'state' => 'required|min:2|max:2',
            'zip_code' => 'required|max:8'
        ]);

        $subscriber = new Subscriber();
        $subscriber->name = $request->name;
        $subscriber->document = $request->document;
        $subscriber->email = $request->email;
        $subscriber->phone = $request->phone;
        $subscriber->district = $request->district;
        $subscriber->number = $request->number;
        $subscriber->state = $request->state;
        $subscriber->city = $request->city;
        $subscriber->zip_code = $request->zip_code;
        
        $subscriber->save();

        return response()->json();
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100',
            'document' => 'required|min:3|max:20',
            'email' => 'required|email|unique:subscribers,email',
            'distrcit' => 'required|max:255',
            'number' => 'required|max:5',
            'state' => 'required|min:2|max:2',
            'zip_code' => 'required|max:8'
        ]);

        $subscriber = Subscriber::where('id', $id)->firstOrFail();

        $subscriber->name = $request->name;
        $subscriber->document = $request->document;
        $subscriber->email = $request->email;
        $subscriber->phone = $request->phone;
        $subscriber->district = $request->district;
        $subscriber->number = $request->number;
        $subscriber->state = $request->state;
        $subscriber->city = $request->city;
        $subscriber->zip_code = $request->zip_code;
        
        $subscriber->save();

        return response()->json();
    }

    public function get(Request $request, $id) {
        $financial_transaction = Subscriber::where('id', $id)->firstOrFail();

        return response()->json($financial_transaction);
    }

    public function list(Request $request) {
        $financial_transaction = Subscriber::select(DB::raw('id, name'))->where('id', $request->id_subscriber)->paginate(10);

        return response()->json($financial_transaction);
    }

    public function delete(Request $request, $id) { 
        Subscriber::where('id', $id)->delete();

        return response()->json();   
    }
}
