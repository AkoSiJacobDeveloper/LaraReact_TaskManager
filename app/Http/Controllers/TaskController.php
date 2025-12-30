<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tasks = Task::query()
            ->when($request->filter === 'pending', fn($q) => $q->where('status', 'pending'))
            ->when($request->filter === 'finished', fn($q) => $q->where('status', 'finished'))
            ->latest()
            ->paginate(5);
        
        return Inertia::render('Homepage/Home', [
            'tasks' => $tasks,
            'filter' => $request->filter ?? 'all',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Homepage/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:20',
            'description' => 'required|max:1000',
            'due_date' => 'nullable|date',
        ]);

        Task::create($validated);

        return redirect('/');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return Inertia::render('Homepage/Show', [
            'task' => $task
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        
        return Inertia::render('Homepage/Edit', [
            'task' => $task
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|max:20',
            'description' => 'required|max:1000',
            'due_date' => 'nullable|date',
            'status' => 'nullable|in:pending,finished',
        ]);

        $task->update($validated);

        return redirect('/');
    }

    public function updateStatus(Request $request, Task $task) {
        $validated = $request->validate([
            'status' => 'required|in:pending,finished'
        ]);

        $task->update($validated);

        return redirect('/');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect('/');
    }
}
