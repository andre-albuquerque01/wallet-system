<?php

use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function(){

    Route::post('sessions', [UserController::class, 'auth']);
    Route::post('register', [UserController::class, 'store']);
    Route::post('re-send-email', [UserController::class, 'reSendEmail']);
    Route::get('verify-email/{id}/{token}', [UserController::class, 'verifyEmail']);
    Route::post('sendTokenRecover', [UserController::class, 'sendTokenRecover']);
    Route::put('resetPassword', [UserController::class, 'resetPassword']);

    Route::middleware('auth:api')->group(function () {
        Route::prefix('user')->group(function () {
            Route::get('', [UserController::class, 'show']);
            Route::put('', [UserController::class, 'update']);
            Route::delete('', [UserController::class, 'destroy']);
        });
    
        Route::prefix('transactions')->group(function () {
            Route::get('', [TransactionController::class, 'index']);
            Route::get('balance', [TransactionController::class, 'balance']);
            Route::get('/{id}', [TransactionController::class, 'show']);
            Route::post('', [TransactionController::class, 'store']);
            Route::delete('/{id}', [TransactionController::class, 'destroy']);
        });
    }); 
});