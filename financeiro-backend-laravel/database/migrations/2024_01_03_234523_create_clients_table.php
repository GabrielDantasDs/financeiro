<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void {
      Schema::create('clients', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('document');
        $table->string('email');
        $table->string('phone');
        $table->string('district');
        $table->string('number');
        $table->string('state');
        $table->string('city');
        $table->string('zip_code');
        $table->timestamps();
      });
    }

    public function down(): void{
        Schema::create('client', function (Blueprint $table) {
            $table->drop();
          });
    }
};
