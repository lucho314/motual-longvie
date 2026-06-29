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
      if (!Schema::hasColumn('retencions', 'inst_cd')) {
        Schema::table('retencions', function (Blueprint $table) {
          $table->decimal('inst_cd', 10, 2)->default(0.00);
        });
      }

      if (!Schema::hasColumn('retencion_mensuals', 'inst_cd')) {
        Schema::table('retencion_mensuals', function (Blueprint $table) {
          $table->decimal('inst_cd', 10, 2)->default(0.00);
        });
      }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      if (Schema::hasColumn('retencions', 'inst_cd')) {
        Schema::table('retencions', function (Blueprint $table) {
          $table->dropColumn('inst_cd');
        });
      }

      if (Schema::hasColumn('retencion_mensuals', 'inst_cd')) {
        Schema::table('retencion_mensuals', function (Blueprint $table) {
          $table->dropColumn('inst_cd');
        });
      }
    }
};
