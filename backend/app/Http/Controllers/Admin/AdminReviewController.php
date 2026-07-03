<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Carbon\Carbon;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class AdminReviewController extends Controller
{
    public function getAllReviews(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $publicCount = Review::where('status', 'public')->count();
        $privateCount = Review::where('status', 'private')->count();
        $totalReviews = Review::count();

        $rawReviews = Review::join('users', 'reviews.user_id', '=', 'users.id')
            ->join('products', 'reviews.product_id', '=', 'products.id')
            ->select('users.name', 'users.email', 'users.photo', 'products.category', 'products.title', 'reviews.*')
            ->orderBy('reviews.id', 'desc')
            ->paginate($perPage);

        $reviews = $rawReviews->through(function ($review) {
            return [
                ...$review->toArray(),
                'created_at' => Carbon::parse($review->created_at)->format('j-M-Y'),
            ];
        });

        if ($reviews->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'No review found!'
            ], 200);
        }

        return response()->json([
            'status' => true,
            'reviews' => $reviews->items(),
            'stats' => [
                'totalReviews' => $totalReviews,
                'publicCount' => $publicCount,
                'privateCount' => $privateCount,
            ],
            "pagination" => [
                "current_page" => $reviews->currentPage(),
                "last_page" => $reviews->lastPage(),
                "total" => $reviews->total(),
                "per_page" => $reviews->perPage()
            ]
        ], 200);
    }

    public function getAllPrivateReviews(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $rawReviews = Review::join('users', 'reviews.user_id', '=', 'users.id')
            ->join('products', 'reviews.product_id', '=', 'products.id')
            ->select('users.name', 'users.email', 'users.photo', 'products.category', 'products.title', 'reviews.*')
            ->where('reviews.status', 'private')
            ->orderBy('reviews.id', 'desc')
            ->paginate($perPage);

        $reviews = $rawReviews->through(function ($review) {
            return [
                ...$review->toArray(),
                'created_at' => Carbon::parse($review->created_at)->format('j-M-Y'),
            ];
        });

        if ($reviews->isEmpty()) {
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

    public function getAllPublicReviews(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $rawReviews = Review::join('users', 'reviews.user_id', '=', 'users.id')
            ->join('products', 'reviews.product_id', '=', 'products.id')
            ->select('users.name', 'users.email', 'users.photo', 'products.category', 'products.title', 'reviews.*')
            ->where('reviews.status', 'public')
            ->orderBy('reviews.id', 'desc')
            ->paginate($perPage);

        $reviews = $rawReviews->through(function ($review) {
            return [
                ...$review->toArray(),
                'created_at' => Carbon::parse($review->created_at)->format('j-M-Y'),
            ];
        });

        if ($reviews->isEmpty()) {
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

    public function getSearchedReview(Request $request)
    {
        $perPage = $request->query('perPage');
        $query = $request->query('query');

        $rawReviews = Review::join('users', 'reviews.user_id', '=', 'users.id')
            ->join('products', 'reviews.product_id', '=', 'products.id')
            ->select('users.name', 'users.email', 'users.photo', 'products.category', 'products.title', 'reviews.*')
            ->where('users.email', $query)
            ->orderBy('reviews.id', 'desc')
            ->paginate($perPage);

        $reviews = $rawReviews->through(function ($review) {
            return [
                ...$review->toArray(),
                'created_at' => Carbon::parse($review->created_at)->format('j-M-Y'),
            ];
        });

        if ($reviews->isEmpty()) {
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

    public function changeReviewStatus($id)
    {
        $review = Review::find($id);

        if ($review->status === 'private') {
            $review->status = 'public';
        } else {
            $review->status = 'private';
        }

        $review->save();

        return response()->json([
            'status' => true,
            'message' => 'Status updated successfully.',
        ], 200);
    }

    public function deleteReview($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json([
                'status' => false,
                'message' => 'Review not found.',
            ], 200);
        }

        $review->delete();

        return response()->json([
            'status' => true,
            'message' => 'Review deleted successfully.',
        ], 200);
    }

    public function getReviewsForDashboard()
    {
        $reviews = Review::select('id', 'status')->get();

        if ($reviews->count() < 0) {
            return response()->json([
                'status' => false,
                'message' => 'No review found!'
            ], 200);
        }

        return response()->json([
            'status' => true,
            'reviews' => $reviews
        ], 200);
    }
}
