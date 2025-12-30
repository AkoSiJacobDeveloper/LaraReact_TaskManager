<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'status',
    ];

    protected $casts = [
        'due_date' => 'datetime',
    ];

    protected $appends = ['is_overdue'];

    protected function isOverdue(): Attribute {
        return Attribute::make(
            get:function () {
                if ($this->status !== 'pending' || !$this->due_date) {
                    return false;
                }

                return $this->due_date->isPast();
            }
        );
    }
}
