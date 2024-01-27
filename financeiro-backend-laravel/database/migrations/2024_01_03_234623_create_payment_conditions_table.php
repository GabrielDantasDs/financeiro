<?php

use App\Models\BankAccount;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payment_conditions', function (Blueprint $table) {
            $table->id();
            $table->integer('installment');
            $table->string('method');
            $table->boolean('paid');

            $table->foreignIdFor(new BankAccount(), 'id_bank_account');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_condition');
    }
};
