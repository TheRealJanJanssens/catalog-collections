<?php

use App\Enums\InputTypes;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attribute_inputs', function (Blueprint $table) {
            $table->uuid();
            $table->string('label');
            $table->enum('type', InputTypes::mySqlValues());
            $table->boolean('required')->default(0);
            $table->json('metadata');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attribute_inputs');
    }
};
