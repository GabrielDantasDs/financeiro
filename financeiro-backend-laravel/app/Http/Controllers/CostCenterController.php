<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CostCenter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CostCenterController extends Controller
{
    public function create(Request $request) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100'
        ]);

        $cost_center = new CostCenter();
        $cost_center->name = $request->name;
        $cost_center->id_category = $request->id_category;
        
        $cost_center->save();

        return response()->json();
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100'
        ]);

        $cost_center = CostCenter::where('id', $id)->first();
        $cost_center->name = $request->name;
        $cost_center->id_category = $request->id_category;
        
        $cost_center->save();

        return response()->json();
    }

    public function get(Request $request, $id) {
        $cost_center = CostCenter::where('id', $id)->firstOrFail();

        return response()->json($cost_center);
    }

    public function list(Request $request) {
        $cost_center = CostCenter::select(DB::raw('id, name'))->paginate(10);

        return response()->json($cost_center);
    }

    public function delete(Request $request, $id) { 
        CostCenter::where('id', $id)->delete();

        return response()->json();   
    }
}
