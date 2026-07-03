<?php

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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->enum('category', ['shirt', 'pant', 'jacket', 'shoes', 'hoodie']);
            $table->string('tags');
            $table->string('title');
            $table->string('slug');
            $table->text('desc');
            $table->string('oldPrice')->nullable(true);
            $table->string('newPrice');
            $table->enum('isNew', ['true', 'false']);
            $table->enum('status', ['true', 'false']);
            $table->enum('avail', ['true', 'false']);
            $table->string('sizes');
            $table->string('colors');
            $table->string('color0image0')->nullable(true);
            $table->string('color0image1')->nullable(true);
            $table->string('color0image2')->nullable(true);
            $table->string('color0image3')->nullable(true);
            $table->string('color1image0')->nullable(true);
            $table->string('color1image1')->nullable(true);
            $table->string('color1image2')->nullable(true);
            $table->string('color1image3')->nullable(true);
            $table->string('color2image0')->nullable(true);
            $table->string('color2image1')->nullable(true);
            $table->string('color2image2')->nullable(true);
            $table->string('color2image3')->nullable(true);
            $table->string('color3image0')->nullable(true);
            $table->string('color3image1')->nullable(true);
            $table->string('color3image2')->nullable(true);
            $table->string('color3image3')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
