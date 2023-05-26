<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVisitRequestsTable extends Migration
{
    public function up()
    {
        Schema::create('visit_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('immobile_id');
            $table->string('name');
            $table->string('phone');
            $table->string('email');
            $table->date('visit_date');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('immobile_id')->references('id')->on('immobile')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('visit_requests');
    }
}
