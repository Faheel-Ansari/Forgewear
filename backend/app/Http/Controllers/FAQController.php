<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Illuminate\Http\Request;

class FAQController extends Controller
{
    public function getAllFaq()
    {
        $allFAQs = FAQ::get();

        if ($allFAQs->count() <= 0) {
            return response()->json([
                'status' => false
            ], 200);
        }
        return response()->json([
            'status' => true,
            'allFAQs' => $allFAQs,
        ], 200);
    }
}
