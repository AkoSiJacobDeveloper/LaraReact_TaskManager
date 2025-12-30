<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [TaskController::class, 'index'])->name('tasks.index');
Route::resource('tasks', TaskController::class)->except('index');
Route::put('/tasks/{task}/status', [TaskController::class, 'updateStatus'])->name('task.update.status');

require __DIR__.'/settings.php';
