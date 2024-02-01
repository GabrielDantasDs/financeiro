<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CostCenter;
use App\Models\FinancialTransaction;
use App\Models\PaymentCondition;
use App\Models\Subscriber;
use App\Models\SubscriberType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubscriberTypeController extends Controller
{
    public function create(Request $request) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100'
        ]);

        $subscriber_type = new SubscriberType();
        $subscriber_type->name = $request->name;
        
        $subscriber_type->save();

        return response()->json();
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100'
        ]);

        $subscriber_type = SubscriberType::where('id', $id)->firstOrFail();
        $subscriber_type->name = $request->name;
        
        $subscriber_type->save();

        return response()->json();
    }

    public function get(Request $request, $id) {
        $financial_transaction = SubscriberType::where('id', $id)->firstOrFail();

        return response()->json($financial_transaction);
    }

    public function list(Request $request) {
        $subscriber_type = SubscriberType::select(DB::raw('id, name'))->where('id', $request->id_subscriber)->paginate(10);

        return response()->json($subscriber_type);
    }

    public function delete(Request $request, $id) { 
        SubscriberType::where('id', $id)->delete();

        return response()->json();   
    }
}
