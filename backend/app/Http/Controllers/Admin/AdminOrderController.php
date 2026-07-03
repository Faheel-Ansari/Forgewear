<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Vinkla\Hashids\Facades\Hashids;

class AdminOrderController extends Controller
{
    public function getAllOrders(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $totalRevenue = Order::where('status', 'delivered')
            ->whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->select(DB::raw('SUM(total + COALESCE(shipCharges, 0)) as grand_total'))
            ->value('grand_total');
        $pendingCount = Order::where('status', 'pending')->count();
        $deliveredCount = Order::where('status', 'delivered')->count();
        $cancelledCount = Order::where('status', 'cancelled')->count();

        $rawOrders = Order::with(['orderDetails:id,orderID,title,size,color,price,quantity,image,subTotal'])->orderBy('id', 'desc')->paginate($perPage);

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
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'pendingCount' => $pendingCount,
                'deliveredCount' => $deliveredCount,
                'cancelledCount' => $cancelledCount,
            ],
            "pagination" => [
                "current_page" => $orders->currentPage(),
                "last_page" => $orders->lastPage(),
                "total" => $orders->total(),
                "per_page" => $orders->perPage()
            ]
        ], 200);
    }

    public function getAllPendingOrders(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $rawOrders = Order::with(['orderDetails:id,orderID,title,size,color,price,quantity,image,subTotal'])->where('status', 'pending')->paginate($perPage);

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

    public function getAllDeliveredOrders(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $rawOrders = Order::with(['orderDetails:id,orderID,title,size,color,price,quantity,image,subTotal'])->where('status', 'delivered')->paginate($perPage);

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

    public function getAllCancelledOrders(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $rawOrders = Order::with(['orderDetails:id,orderID,title,size,color,price,quantity,image,subTotal'])->where('status', 'cancelled')->paginate($perPage);

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

    public function getSearchedOrder(Request $request)
    {
        $perPage = $request->query('perPage');
        $decoded = Hashids::decode($request->query('query'));
        $rawID = $decoded[0];

        $rawOrders = Order::with(['orderDetails:id,orderID,title,size,color,price,quantity,image,subTotal'])->where('id', $rawID)->paginate($perPage);

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

    public function changeOrderStatus($id)
    {
        $decoded = Hashids::decode($id);
        if (empty($decoded)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid order id',
            ], 400);
        }

        $rawID = $decoded[0];

        $order = Order::where('id', $rawID)->first();

        if ($order->status === 'pending') {
            $order->status = 'delivered';
        }

        $order->save();

        return response()->json([
            'status' => true,
            'message' => 'Status updated successfully.',
        ], 200);
    }

    public function cancelOrder($id)
    {
        $decoded = Hashids::decode($id);
        if (empty($decoded)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid order id',
            ], 400);
        }

        $rawID = $decoded[0];

        $order = Order::find($rawID);

        if ($order->status === 'pending') {
            $order->status = 'cancelled';
        }

        $order->save();

        return response()->json([
            'status' => true,
            'message' => 'Order cancelled successfully.',
        ], 200);
    }

    public function getOrdersForDashboard()
    {
        $user = Auth::user();
        $userRawOrders = collect();
        if ($user?->role === 'user') {
            $userRawOrders = Order::select('id', 'status', 'shipCharges', 'total', 'created_at')->where('user_id', $user?->id)->orderBy('id', 'desc')->get();
        }

        $totalRevenue = Order::where('status', 'delivered')
            ->whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->select(DB::raw('SUM(total + COALESCE(shipCharges, 0)) as grand_total'))
            ->value('grand_total');

        $rawOrders = Order::select('id', 'status', 'shipFirstName', 'shipLastName', 'shipCharges', 'total', 'created_at')->orderBy('id', 'desc')->get();

        $orders = $rawOrders->map(function ($order) {
            $id = Hashids::encode($order->id);

            return [
                ...$order->toArray(),
                'id' => $id
            ];
        });

        $userOrders = $userRawOrders->map(function ($order) {
            $id = Hashids::encode($order->id);

            return [
                ...$order->toArray(),
                'created_at' => $order->created_at->format('j-M-Y'),
                'id' => $id
            ];
        });

        $days = [
            'Mon' => 0,
            'Tue' => 0,
            'Wed' => 0,
            'Thu' => 0,
            'Fri' => 0,
            'Sat' => 0,
            'Sun' => 0,
        ];

        foreach ($rawOrders as $order) {
            $day = Carbon::parse($order->created_at)->format('D');

            $days[$day]++;
        }

        $chartData = [];

        foreach ($days as $day => $count) {
            $chartData[] = [
                'name' => $day,
                'orders' => $count,
            ];
        }


        if ($orders->count() <= 0) {
            return response()->json([
                'status' => false,
                'message' => 'Orders not found',
            ], 200);
        }

        return response()->json([
            'status' => true,
            'orders' => $orders,
            'totalRevenue' => $totalRevenue,
            'chartData' => $chartData,
            'userOrders' => $userOrders,
        ], 200);
    }
}
