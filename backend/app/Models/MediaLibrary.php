<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaLibrary extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $table = 'media_library';
}
