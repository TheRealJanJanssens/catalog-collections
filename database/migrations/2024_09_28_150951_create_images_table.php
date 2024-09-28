<?php

use App\Enums\ImageableTypes;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->unsignedBigInteger('annotation_id')->nullable();
            $table->integer('rotation')->default(0);
            $table->json('crop');
            $table->integer('order')->default(0);
            //$table->morphs('imageable');
            $table->bigInteger('imageable_id')->unsigned();
            $table->enum('imageable_type', ImageableTypes::mySqlValues());
            $table->timestamps();

            $table->foreign('annotation_id')->references('id')->on('annotations')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('images');
    }
};
