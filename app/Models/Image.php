<?php

namespace App\Models;

use App\Enums\ImageableTypes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'annotation_id',
        'rotation',
        'crop',
        'imageable_id',
        'imageable_type'
    ];

    protected $casts = [
        'crop' => 'array',
        'imageable_type' => ImageableTypes::class,
    ];

    public function imageable()
    {
        return $this->morphTo();
    }

    public function annotation()
    {
        return $this->belongsTo(Annotation::class);
    }
}
