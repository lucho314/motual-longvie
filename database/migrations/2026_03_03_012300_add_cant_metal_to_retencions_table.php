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
        if (!Schema::hasColumn('retencions', 'cant_metal')) {
            Schema::table('retencions', function (Blueprint $table) {
                $table->decimal('cant_metal', 10, 2)->default(0.00);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('retencions', 'cant_metal')) {
            Schema::table('retencions', function (Blueprint $table) {
                $table->dropColumn('cant_metal');
            });
        }
    }
};
