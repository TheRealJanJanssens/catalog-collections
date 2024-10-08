<?php

namespace App\Models;

use App\Concerns\Models\CreateUuid;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasUuids, CreateUuid;

    protected $fillable = [
        'code',
        'name'
    ];
}
