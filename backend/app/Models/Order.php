<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $table = 'orders';

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'orderID');
    }
}
