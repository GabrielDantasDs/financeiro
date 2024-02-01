<?php

use App\Models\FinancialTransaction;
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
        Schema::create('installments', function (Blueprint $table) {
            $table->id();
            $table->double('value');
            $table->integer('number');
            $table->boolean('paid')->default(false);
            $table->datetime('payday')->nullable();
            $table->datetime('dueday')->nullable();

            $table->foreignIdFor(new FinancialTransaction(), 'id_financial_transaction');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('installments');
    }
};
