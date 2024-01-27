<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Category;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cost_centers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            
            $table->foreignIdFor(new Category(), 'id_category');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::create('cost_center', function (Blueprint $table) {
            $table->drop();
        });
    }
};
