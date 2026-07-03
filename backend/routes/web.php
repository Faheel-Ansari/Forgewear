<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

Route::get('send-email', [EmailController::class, 'sendEmail']);
