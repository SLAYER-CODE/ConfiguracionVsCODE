<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeeDepartamentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_departament', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('IDemployeed')->nullable()->index('fk_employeed');
            $table->integer('IDdepartments')->nullable()->index('fk_departments');
            $table->timestamp('date_intro')->useCurrentOnUpdate()->useCurrent();
            $table->timestamp('date_exit')->useCurrentOnUpdate()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_departament');
    }
}
