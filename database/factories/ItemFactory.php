<?php

namespace Database\Factories;

use App\Models\Collection;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name()
        ];
    }

    public function belongsToUser($uuid = false) {
        if (!$uuid) {
            $user = User::inRandomOrder()->first();
            $uuid = $user->uuid;
        }

        return $this->state(function (array $attributes) use ($uuid) {
            return [
                'user_uuid' => $uuid,
            ];
        });
    }

    public function belongsToCollection($uuid = false) {
        if (!$uuid) {
            $collection = Collection::inRandomOrder()->first();
            $uuid = $collection->uuid;
        }

        return $this->state(function (array $attributes) use ($uuid) {
            return [
                'collection_uuid' => $uuid,
            ];
        });
    }
}
