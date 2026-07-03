<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $guarded = ['id','created_at','updated_at'];

    public function productRating()
    {
        return $this->hasMany(Review::class, 'product_id');
    }
}
