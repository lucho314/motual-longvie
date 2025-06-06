<?php

use App\Http\Controllers\Api\LiquidacionController;
use App\Http\Controllers\Api\SocioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('socios', SocioController::class);
    Route::apiResource('liquidacion', LiquidacionController::class);

    //reenviarRetencionAlSocio
    Route::post('liquidacion/reenviar', [LiquidacionController::class, 'reenviarRetencionAlSocio']);
    Route::get('liquidacion/{id}/detalle', [LiquidacionController::class, 'detalleLiquidacion']);
});
