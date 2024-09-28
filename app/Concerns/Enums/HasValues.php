<?php

namespace App\Concerns\Enums;

trait HasValues
{
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function mySqlValues(): array
    {
        return collect(self::cases())
            ->map(function ($enum) {
                return str_replace(['\\', "\0", "\n", "\r", "'", '"', "\x1a"], ['\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'], $enum->value);
            })->toArray();
    }
}
