<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $table = 'order_details';
}
