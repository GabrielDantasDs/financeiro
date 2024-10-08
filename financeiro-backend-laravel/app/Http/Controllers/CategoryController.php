<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function create(Request $request) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100'
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->id_subscriber = $request->id_subscriber;
        
        $category->save();

        return response()->json();
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100'
        ]);

        $category = Category::where('id', $id)->first();
        $category->name = $request->name;
        
        $category->save();

        return response()->json();
    }

    public function get(Request $request, $id) {
        $category = Category::where('id', $id)->firstOrFail();

        return response()->json($category);
    }

    public function list(Request $request) {
        $category = Category::select(DB::raw('id, name'))->paginate(10);

        return response()->json($category);
    }

    public function delete(Request $request, $id) { 
        Category::where('id', $id)->delete();

        return response()->json();   
    }
}
