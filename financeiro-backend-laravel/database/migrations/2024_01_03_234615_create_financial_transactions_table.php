<?php

use App\Models\Subscriber;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('financial_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->double('value');
            $table->string('note');
            $table->date('invoice_date');
            $table->boolean('paid')->false();
            $table->date('payment_day')->nullable();
            $table->integer('periodicity')->nullable();
            $table->string('periodicity_type');
            $table->string('form_payment');

            $table->foreignIdFor(Subscriber::class, 'id_subscriber');

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
