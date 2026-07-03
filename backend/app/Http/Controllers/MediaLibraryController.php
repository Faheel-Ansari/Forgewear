<?php

namespace App\Http\Controllers;

use App\Models\MediaLibrary;
use Illuminate\Http\Request;

class MediaLibraryController extends Controller
{
    public function getMediaLibrary()
    {
        // return 'hello';
        $images = MediaLibrary::first();

        if (!empty($images)) {
            return response()->json([
                'status' => true,
                'images' => $images
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'images not found'
            ], 200);
        }
    }
}
