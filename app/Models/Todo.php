<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        "id",
        "user_id",
        "title",
        "description",
        "finished"
    ];

    protected $casts = [
        'id' => 'string',
    ];
}
