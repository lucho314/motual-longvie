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
        $columns = [
            'varios_bebidas',
            'prestamos',
            'interes_prestamos',
            'campera',
            'asado',
            'torno_pezca',
            'torneo_pesca',
            'marv_mundo',
            'rifa',
            'alm_met',
            'cant_metal',
            'sofia_shop',
        ];

        foreach ($columns as $column) {
            if (!Schema::hasColumn('retencions', $column)) {
                Schema::table('retencions', function (Blueprint $table) use ($column) {
                    $table->decimal($column, 10, 2)->default(0.00);
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $columns = [
            'varios_bebidas',
            'prestamos',
            'interes_prestamos',
            'campera',
            'asado',
            'torno_pezca',
            'torneo_pesca',
            'marv_mundo',
            'rifa',
            'alm_met',
            'cant_metal',
            'sofia_shop',
        ];

        foreach ($columns as $column) {
            if (Schema::hasColumn('retencions', $column)) {
                Schema::table('retencions', function (Blueprint $table) use ($column) {
                    $table->dropColumn($column);
                });
            }
        }
    }
};
