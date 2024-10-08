<?php

namespace App\Models;

use App\Concerns\Models\CreateUuid;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attribute extends Model
{
    use HasUuids, CreateUuid;

    protected $primaryKey = 'uuid';

    protected $fillable = [
        'value',
        'input_uuid'
    ];

    public function input(): BelongsTo
    {
        return $this->belongsTo(AttributeInput::class, ownerKey: 'input_uuid');
    }
}
