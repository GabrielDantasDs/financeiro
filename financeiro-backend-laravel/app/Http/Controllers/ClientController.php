<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    public function create(Request $request) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100',
            'document' => 'required|unique:clients,document',
            'email' => 'required|unique:clients,email',
            'phone' => 'required|unique:clients,phone|max:32',
            'district' => 'required|max:255',
            'number' => 'required|max:4',
            'state' => 'required|min:2|max:2',
            'city' => 'required|max:100',
            'zip_code' => 'required',
        ]);

        $client = new Client();
        $client->name = $request->name;
        $client->document = $request->document;
        $client->email = $request->email;
        $client->phone = $request->phone;
        $client->district = $request->district;
        $client->number = $request->number;
        $client->state = $request->state;
        $client->city = $request->city;
        $client->zip_code = $request->zip_code;

        $client->save();

        return response()->json([], 201);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100',
            'document' => 'required|unique:clients,document,'. $id,
            'email' => 'required|unique:clients,email,'. $id,
            'phone' => 'required|max:32|unique:clients,phone,'. $id,
            'district' => 'required|max:255',
            'number' => 'required|max:4',
            'state' => 'required|min:2|max:2',
            'city' => 'required|max:100',
            'zip_code' => 'required|max:8',
        ]);

        $client = Client::where('id', $id)->firstOrFail();

        $client->name = $request->name;
        $client->document = $request->document;
        $client->email = $request->email;
        $client->phone = $request->phone;
        $client->district = $request->district;
        $client->number = $request->number;
        $client->state = $request->state;
        $client->city = $request->city;
        $client->zip_code = $request->zip_code;

        $client->save();

        return response()->json();
    }

    public function get(Request $request, $id) {
        $client = Client::where('id', $id)->firstOrFail();

        return response()->json($client);
    }

    public function list(Request $request) {
        $clients = Client::select(DB::raw('id, name, email'))->paginate(10);

        return response()->json($clients);
    }

    public function delete(Request $request, $id) {
        Client::where('id', $id)->delete();

        return response()->json();
    }
}
