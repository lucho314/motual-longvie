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
        Schema::create('socios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('legajo')->unique();
            $table->string('nombre');
            $table->string('correo')->nullable()->index();
            $table->softDeletes();
            //usuario de alta y de modificacion
            $table->unsignedBigInteger('usuario_alta_id')->nullable();
            $table->unsignedBigInteger('usuario_modificacion_id')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('socios');
    }
};
