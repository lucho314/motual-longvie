<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\SocioController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/login', function () {
    return view('welcome');
})->name("login");

//prueba devolver prueba

Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::post('/password/change', [ChangePasswordController::class, 'update'])->name('password.change');


Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

    Route::get('/{any}', function () {
        return view('welcome'); // app.blade.php
    })->where('any', '.*');
    // otras rutas protegidas
});
