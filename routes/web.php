<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/**
 * Views
 */
Route::middleware(['auth', 'verified'])->group(function(){
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/item', function () {
        return Inertia::render('Item/Index');
    })->name('items.index');

    Route::get('/item/create', function () {
        return Inertia::render('Item/Create');
    })->name('items.create');

    Route::get('/collection', function () {
        return Inertia::render('Collection/Index');
    })->name('collections.index');
});

/**
 * Actions
 */
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('images', ImageController::class)->only([
        'store', 'update', 'destroy'
    ]);
});

require __DIR__.'/auth.php';
