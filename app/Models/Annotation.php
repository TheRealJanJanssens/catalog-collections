<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Annotation extends Model
{
    protected $fillable = ['content'];

    // Optional: If annotations can be linked to multiple images
    public function image()
    {
        return $this->belongsTo(Image::class);
    }
}
