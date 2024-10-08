<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SupplierController extends Controller
{
    public function create(Request $request) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100',
            'document' => 'required|unique:suppliers,document',
            'email' => 'required|unique:suppliers,email',
            'phone' => 'required|unique:suppliers,phone|max:32',
            'district' => 'required|max:255',
            'number' => 'required|max:4',
            'state' => 'required|min:2|max:2',
            'city' => 'required|max:100',
            'zip_code' => 'required',
        ]);

        $supplier = new Supplier();
        $supplier->name = $request->name;
        $supplier->document = $request->document;
        $supplier->email = $request->email;
        $supplier->phone = $request->phone;
        $supplier->district = $request->district;
        $supplier->number = $request->number;
        $supplier->state = $request->state;
        $supplier->city = $request->city;
        $supplier->zip_code = $request->zip_code;
        $supplier->description = $request->description;

        $supplier->save();

        return response()->json([], 201);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100',
            'document' => 'required|unique:suppliers,document,'. $id,
            'email' => 'required|unique:suppliers,email,'. $id,
            'phone' => 'required|max:32|unique:suppliers,phone,'. $id,
            'district' => 'required|max:255',
            'number' => 'required|max:4',
            'state' => 'required|min:2|max:2',
            'city' => 'required|max:100',
            'zip_code' => 'required|max:8',
        ]);

        $supplier = Supplier::where('id', $id)->firstOrFail();

        $supplier->name = $request->name;
        $supplier->document = $request->document;
        $supplier->email = $request->email;
        $supplier->phone = $request->phone;
        $supplier->district = $request->district;
        $supplier->number = $request->number;
        $supplier->state = $request->state;
        $supplier->city = $request->city;
        $supplier->zip_code = $request->zip_code;
        $supplier->description = $request->description;

        $supplier->save();

        return response()->json();
    }

    public function get(Request $request, $id) {
        $supplier = Supplier::where('id', $id)->firstOrFail();

        return response()->json($supplier);
    }

    public function list(Request $request) {
        $suppliers = Supplier::select(DB::raw('id, name, email'))->paginate(10);

        return response()->json($suppliers);
    }

    public function delete(Request $request, $id) {
        Supplier::where('id', $id)->delete();

        return response()->json();
    }
}
