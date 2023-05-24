<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImmobileController;
use App\Http\Controllers\VisitRequestController;

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('immobiles', [ImmobileController::class, 'store']);
    Route::get('immobiles', [ImmobileController::class, 'index']);
    Route::get('immobiles/{id}', [ImmobileController::class, 'show']);
    Route::put('immobiles/{id}', [ImmobileController::class, 'update']);
    Route::delete('immobiles/{id}', [ImmobileController::class, 'destroy']);
    Route::post('/immobiles/{id}/mark-visit', [ImmobileController::class, 'markVisit']);
    Route::get('/visit-requests', [ImmobileController::class, 'getAllVisitRequests']);
});

Route::post('logout', [UserController::class, 'logout']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('users', [UserController::class, 'getUsers']);
