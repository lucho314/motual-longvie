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
        if (!Schema::hasColumn('retencions', 'asado')) {
            Schema::table('retencions', function (Blueprint $table) {
                $table->decimal('asado', 10, 2)->default(0.00)->after('campera');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('retencions', 'asado')) {
            Schema::table('retencions', function (Blueprint $table) {
                $table->dropColumn('asado');
            });
        }
    }
};
