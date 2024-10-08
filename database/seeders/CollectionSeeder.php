<?php

namespace Database\Seeders;

use App\Models\Collection;
use Illuminate\Database\Seeder;

class CollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Collection::factory(10)->create();

        $collections = [
            [
                'name' => [
                    [
                        'code' => 'nl',
                        'value' => 'Militaria'
                    ],
                    [
                        'code' => 'en',
                        'value' => 'Militaria'
                    ]
                ],
                'inputs' => [
                    [
                        'type' => 'text',
                        'required' => true,
                        'label' => [
                            [
                                'code' => 'nl',
                                'value' => 'Titel'
                            ],
                            [
                                'code' => 'en',
                                'value' => 'Title'
                            ]
                        ]
                    ],
                    [
                        'type' => 'select',
                        'required' => true,
                        'label' => [
                            [
                                'code' => 'nl',
                                'value' => 'Periode'
                            ],
                            [
                                'code' => 'en',
                                'value' => 'Era'
                            ]
                        ],
                        'options' => [
                            [
                                'code' => 'nl',
                                'value' => 'Wereldoorlog 1'
                            ],
                            [
                                'code' => 'en',
                                'value' => 'World War 1'
                            ]
                        ]
                    ]
                ]
            ]
        ];
    }
}
