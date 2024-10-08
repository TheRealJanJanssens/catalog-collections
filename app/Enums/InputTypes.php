<?php

namespace App\Enums;

use App\Concerns\Enums\HasOptions;
use App\Concerns\Enums\HasValues;

enum InputTypes: string
{
    use HasOptions, HasValues;

    case TEXT = 'TextInput';
    case IMAGE = 'ImageInput';
    case CHECKBOX = 'CheckBoxInput';

    public function key(): string
    {
        return match ($this) {
            self::TEXT => 'text',
            self::IMAGE => 'image',
            self::CHECKBOX => 'checkbox',
        };
    }
}
