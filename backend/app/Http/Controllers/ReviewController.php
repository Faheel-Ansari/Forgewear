<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function getAllReview()
    {
        $reviews = Review::leftJoin('users', 'users.id', '=', 'reviews.user_id')->select('users.name', 'users.photo', 'reviews.*')->where('reviews.status', '=', 'public')->limit(60)->get();
        $reviewCount = Review::where('status', 'public')->count();
        return response()->json([
            'status' => true,
            'reviews' => $reviews,
            'reviewCount' => $reviewCount,
        ], 200);
    }

    public function getDetailReview($id)
    {
        $reviews = Review::leftJoin('users', 'users.id', '=', 'reviews.user_id')->where('reviews.product_id', $id)->select('users.name', 'users.photo', 'reviews.*')->where('reviews.status', '=', 'public')->get();
        $reviewCount = Review::leftJoin('users', 'users.id', '=', 'reviews.user_id')->where('reviews.product_id', $id)->select('users.name', 'users.photo', 'reviews.*')->where('reviews.status', '=', 'public')->count();

        return response()->json([
            'status' => true,
            'reviews' => $reviews,
            'reviewCount' => $reviewCount,
        ], 200);
    }

    public function addReview(Request $req)
    {
        $validation = Validator::make($req->all(), [
            'rating' => 'numeric|required|min:1|max:5',
            'product_id' => 'numeric|required'
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validation->messages()
            ], 422);
        }

        $userID = Auth::check() ? Auth::id() : null;

        $review = Review::create([
            'user_id' => $userID,
            'product_id' => $req->product_id,
            'rating' => $req->rating,
            'review' => $req->message != "" ? $req->message : null,
        ]);

        if ($review) {
            return response()->json([
                'status' => true,
                'message' => 'Review posted successfully.',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Something went wrong',
            ], 500);
        }
    }

    public function verifyToWriteReview($productID)
    {
        $user = Auth::user()?->id;
        $intProductID = (int) $productID;

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'user not found'
            ], 400);
        }

        $order = Order::join('order_details', 'orders.id', '=', 'order_details.orderID')
            ->where('orders.user_id', '=', $user)
            ->where('order_details.productID', '=', $intProductID)
            ->where('orders.status', '=', 'delivered')
            ->first();

        if (!$order) {
            return response()->json([
                'status' => false,
                'message' => 'order not found'
            ], 200);
        }
        return response()->json([
            'status' => true,
            'message' => 'verified to write a review'
        ], 200);
    }
}
