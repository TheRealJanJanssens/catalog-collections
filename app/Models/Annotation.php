<?php

namespace App\Models;

use App\Concerns\Models\CreateUuid;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Annotation extends Model
{
    use HasUuids, CreateUuid;

    protected $primaryKey = 'uuid';
    protected $fillable = ['content'];

    // Optional: If annotations can be linked to multiple images
    public function image()
    {
        return $this->belongsTo(Image::class);
    }
}
