<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('retencions', 'marv_mundo')) {
            Schema::table('retencions', function (Blueprint $table) {
                $table->decimal('marv_mundo', 10, 2)->default(0.00);
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('retencions', 'marv_mundo')) {
            Schema::table('retencions', function (Blueprint $table) {
                $table->dropColumn('marv_mundo');
            });
        }
    }
};
