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
        Schema::create('retencions', function (Blueprint $table) {
            $table->id();
            $table->string('legajo');
            $table->string('periodo')->index(); // ejemplo: 2024-03
            $table->decimal('cuota', 10, 2)->nullable();
            $table->decimal('ss_adm', 10, 2)->nullable();
            $table->decimal('fcia_maria_luisa', 10, 2)->nullable();
            $table->decimal('fcia_amur', 10, 2)->nullable();
            $table->decimal('fcia_la_botica', 10, 2)->nullable();
            $table->decimal('oseca', 10, 2)->nullable();
            $table->decimal('villegas', 10, 2)->nullable();
            $table->decimal('luz_y_fza', 10, 2)->nullable();
            $table->decimal('flama', 10, 2)->nullable();
            $table->decimal('fontana', 10, 2)->nullable();
            $table->decimal('moto_city', 10, 2)->nullable();
            $table->decimal('transporte', 10, 2)->nullable();
            $table->decimal('mutual_sol', 10, 2)->nullable();
            $table->decimal('viandas', 10, 2)->nullable();
            $table->decimal('seguro', 10, 2)->nullable();
            $table->decimal('uso_ins_cd', 10, 2)->nullable();
            $table->decimal('cantina_cd', 10, 2)->nullable();
            $table->decimal('saldo', 10, 2)->nullable();
            $table->decimal('interes_saldo', 10, 2)->nullable();
            $table->decimal('sub_total', 10, 2)->nullable();
            $table->decimal('gasto_bancario', 10, 2)->nullable();
            $table->decimal('total', 10, 2)->nullable();
            $table->decimal('sueldo', 10, 2)->nullable();
            $table->timestamps();

            $table->unique(['legajo', 'periodo']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('retencions');
    }
};
