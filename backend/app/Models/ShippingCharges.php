<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingCharges extends Model
{
    protected $table = 'shipping_charges';
    protected $guarded = ['id'];

    public $timestamps = false;
}
