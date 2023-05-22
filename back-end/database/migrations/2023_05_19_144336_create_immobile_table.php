<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImmobileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('immobile', function (Blueprint $table) {
            $table->id();
            $table->string('owner');
            $table->string('type');
            $table->string('address');
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->decimal('total_area', 8, 2);
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('immobile');
    }
}
