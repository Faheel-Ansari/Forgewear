<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Vinkla\Hashids\Facades\Hashids;

class UserOrderController extends Controller
{
    public function getUserOrders(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $userID = Auth::user()?->id;
        $rawOrders = Order::with(['orderDetails:id,orderID,title,size,color,price,quantity,image,subTotal'])->where('user_id', '=', $userID)->orderBy('id','desc')->paginate($perPage);

        $orders = $rawOrders->through(function ($order) {
            $id = Hashids::encode($order->id);

            return [
                ...$order->toArray(),
                'created_at' => $order->created_at->format('j-M-Y'),
                'id' => $id
            ];
        });
        if ($orders->count() <= 0) {
            return response()->json([
                'status' => false,
                'message' => 'Orders not found',
            ], 200);
        }

        return response()->json([
            'status' => true,
            'orders' => $orders->items(),
            "pagination" => [
                "current_page" => $orders->currentPage(),
                "last_page" => $orders->lastPage(),
                "total" => $orders->total(),
                "per_page" => $orders->perPage()
            ]
        ], 200);
    }
}
