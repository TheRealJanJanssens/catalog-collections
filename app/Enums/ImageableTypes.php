<?php

namespace App\Enums;

use App\Concerns\Enums\HasOptions;
use App\Concerns\Enums\HasValues;

enum ImageableTypes: string
{
    use HasOptions, HasValues;

    case ITEM = 'App\Models\Item';
    case USER = 'App\Models\User';

    public function key(): string
    {
        return match ($this) {
            self::ITEM => 'item',
            self::USER => 'user',
        };
    }
}
