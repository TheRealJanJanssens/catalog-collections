<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        switch(env('APP_ENV')) {

            /**
             * Local/testing seeds
             */
            case 'local':
            case 'testing':
                $seeds = [
                    CollectionSeeder::class,
                    UserSeeder::class,
                    ItemSeeder::class,
                ];
            break;

            /**
             * Staging seeds
             */
            case 'staging':
                $seeds = [

                ];
            break;

            /**
             * Production seeds
             */
            case 'production':
                $seeds = [

                ];
            break;
        }


        /**
         * Run seeders
         */
        array_map(fn($s) => $this->call($s), $seeds);
    }
}
