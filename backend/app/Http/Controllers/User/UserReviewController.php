<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function PHPUnit\Framework\isEmpty;

class UserReviewController extends Controller
{
    public function getUserReviews(Request $request)
    {
        $perPage = $request->query('perPage');

        $userID = Auth::user()?->id;

        $rawReviews = Review::join('products', 'reviews.product_id', '=', 'products.id')
            ->where('reviews.user_id', '=', $userID)
            ->select('products.title', 'reviews.*')
            ->paginate($perPage);

        $reviews = $rawReviews->through(function ($review) {
            return [
                ...$review->toArray(),
                'created_at' => $review->created_at->format('j-M-Y'),
            ];
        });
        // return $rawReviews;
        if (isEmpty($reviews)) {
            return response()->json([
                'status' => false,
                'message' => 'No review found!'
            ], 200);
        }

        return response()->json([
            'status' => true,
            'reviews' => $reviews->items(),
            "pagination" => [
                "current_page" => $reviews->currentPage(),
                "last_page" => $reviews->lastPage(),
                "total" => $reviews->total(),
                "per_page" => $reviews->perPage()
            ]
        ], 200);
    }
}
