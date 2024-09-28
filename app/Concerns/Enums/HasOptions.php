<?php

namespace App\Concerns\Enums;

trait HasOptions
{
    public static function options(): array
    {
        return collect(self::cases())
            ->mapWithKeys(function ($enum) {
                return [$enum->key() => $enum->value];
            })->toArray();
    }

    abstract public function key(): string;
}
