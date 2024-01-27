<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BankAccountController;
use App\Models\Category;
use App\Models\PaymentCondition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'requestPasswordResetLink']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::middleware('auth:sanctum')->group(function () {
    // Route::controller(ClientController::class)->group(function() {
    //     Route::get('/client/{id}', 'get');
    //     Route::post('/client', 'create');
    //     Route::put('/client/{id}', 'update');
    //     Route::post('/client/list', 'list');
    //     Route::delete('/client/{id}', 'list');
    // });

    // Route::controller(CategoryController::class)->group(function() {
    //     Route::get('/category/{id}', 'get');
    //     Route::post('/category', 'create');
    //     Route::put('/category/{id}', 'update');
    //     Route::put('/category/list', 'list');
    //     Route::delete('/category/{id}', 'delete');
    // });

    Route::controller(BankAccountController::class)->group(function() {
        Route::get('/bank-account/{id}', 'get');
        Route::post('/bank-account', 'create');
        Route::put('/bank-account/{id}', 'update');
        Route::put('/bank-account/list', 'list');
        Route::delete('/bank-account/{id}', 'delete');
    });

    // Route::controller(CostCenterController::class)->group(function() {
    //     Route::get('/cost-center/{id}', 'get');
    //     Route::post('/cost-center', 'create');
    //     Route::put('/cost-center/{id}', 'update');
    //     Route::put('/cost-center/list', 'list');
    //     Route::delete('/cost-center/{id}', 'delete');
    // });

    // Route::controller(FinancialTransactionController::class)->group(function() {
    //     Route::get('/cost-center/{id}', 'get');
    //     Route::post('/cost-center', 'create');
    //     Route::put('/cost-center/{id}', 'update');
    //     Route::put('/cost-center/list', 'list');
    //     Route::delete('/cost-center/{id}', 'delete');
    // });

    // Route::controller(InstallmentController::class)->group(function() {
    //     Route::get('/installment/{id}', 'get');
    //     Route::post('/installment', 'create');
    //     Route::put('/installment/{id}', 'update');
    //     Route::put('/installment/list', 'list');
    //     Route::delete('/installment/{id}', 'delete');
    // });

    // Route::controller(PaymentConditionController::class)->group(function() {
    //     Route::get('/payment-condition/{id}', 'get');
    //     Route::post('/payment-condition', 'create');
    //     Route::put('/payment-condition/{id}', 'update');
    //     Route::put('/payment-condition/list', 'list');
    //     Route::delete('/payment-condition/{id}', 'delete');
    // });

    // Route::controller(SubscriberController::class)->group(function() {
    //     Route::get('/subscriber/{id}', 'get');
    //     Route::post('/subscriber', 'create');
    //     Route::put('/subscriber/{id}', 'update');
    //     Route::put('/subscriber/list', 'list');
    //     Route::delete('/subscriber/{id}', 'delete');
    // });

    // Route::controller(SubscriberTypeController::class)->group(function() {
    //     Route::get('/subscriber-type/{id}', 'get');
    //     Route::post('/subscriber-type', 'create');
    //     Route::put('/subscriber-type/{id}', 'update');
    //     Route::put('/subscriber-type/list', 'list');
    //     Route::delete('/subscriber-type/{id}', 'delete');
    // });

    // Route::controller(UserController::class)->group(function() {
    //     Route::get('/user/{id}', 'get');
    //     Route::post('/user', 'create');
    //     Route::put('/user/{id}', 'update');
    //     Route::put('/user/list', 'list');
    //     Route::delete('/user/{id}', 'delete');
    // });
});