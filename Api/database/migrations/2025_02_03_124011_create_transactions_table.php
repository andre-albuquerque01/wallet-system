<?php

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
        Schema::create('transactions', function (Blueprint $table) {
            $table->ulid('id')->primary();;
            $table->decimal('value', 15, 2)->comment('Valor da transação');
            $table->enum('type', ['credit', 'debit', 'transfer'])->comment('Define se é entrada, saída ou transferência'); 
            $table->foreignUlid('sender_id')->nullable()->references('id')->on('users')->onDelete('cascade');
            $table->foreignUlid('receiver_id')->nullable()->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
