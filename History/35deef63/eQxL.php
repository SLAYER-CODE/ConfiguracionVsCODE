<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDepartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('departments', function (Blueprint $table) {
            $table->integer('id', true);
            $table->char('name', 50)->unique('name');
            $table->integer('number_ubigeo')->unique('number_ubigeo');
            $table->timestamp('create_at')->default('0000-00-00 00:00:00');
            $table->timestamp('update_at')->default('0000-00-00 00:00:00');
            $table->integer('ubication')->nullable()->index('FK_ubication_deparments');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('departments');
    }
}
