<?php

namespace App\Http\Controllers;

use App\Mail\orderemail;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Vinkla\Hashids\Facades\Hashids;

use function PHPUnit\Framework\isEmpty;

class OrderController extends Controller
{
    public function placeOrder(Request $req)
    {
        $throttleKey = 'place_order|' . (Auth::check() ? Auth::id() : $req->ip());

        // 2. Check if they hit the limit (e.g., max 3 orders/attempts per 2 minutes)
        if (RateLimiter::tooManyAttempts($throttleKey, 2)) {
            $seconds = RateLimiter::availableIn($throttleKey);

            return response()->json([
                'status' => false,
                'message' => "Too many checkout attempts. Please try again in {$seconds} seconds."
            ], 429);
        }

        $validation = Validator::make($req->all(), [
            'contact' => 'required|string',
            'email' => 'required|email',

            'shippingFirstName' => 'required|string',
            'shippingLastName' => 'required|string',
            'shippingAddress' => 'required|string',
            'shippingCity' => 'required|string',
            'shippingProvince' => 'required|string',
            'shippingZip' => 'required|string',

            'shippingCharges' => 'required',
            'total' => 'required',

            'orderDetails' => 'required|string',
        ]);

        if ($validation->fails()) {
            RateLimiter::hit($throttleKey, 10);
            return response()->json([
                'message' => $validation->messages()
            ], 422);
        }

        $user = Auth::guard('sanctum')->user();

        $order = Order::create([
            'user_id' => $user ? $user->id : null,
            'contact' => $req->contact,
            'email' => $req->email,

            'shipFirstName' => $req->shippingFirstName,
            'shipLastName' => $req->shippingLastName,
            'shipAddress' => $req->shippingAddress,
            'shipCity' => $req->shippingCity,
            'shipProvince' => $req->shippingProvince,
            'shipZip' => $req->shippingZip,

            'payMethod' => $req->payMethod,
            'sameAsShipping' => $req->sameAsShipping,

            'billFirstName' => $req->billingFirstName,
            'billLastName' => $req->billingLastName,
            'billAddress' => $req->billingAddress,
            'billCity' => $req->billingCity,
            'billProvince' => $req->billingProvince,
            'billZip' => $req->billingZip,

            'cardholderName' => $req->cardholderName,
            'cardNumber' => $req->cardNumber,
            'expiryDate' => $req->expiryDate,
            'cvv' => $req->cvv,

            'shipCharges' => $req->shippingCharges,
            'total' => $req->total,
        ]);

        if ($order) {
            RateLimiter::hit($throttleKey, 10);

            foreach (json_decode($req->orderDetails) as $key => $detail) {

                $subTotal = $detail->quantity * $detail->newPrice;

                $orderDetail = OrderDetail::create([
                    'orderID' => $order->id,
                    'productID' => $detail->id,
                    'varientID' => $detail->varientID,
                    'title' => $detail->title,
                    'size' => $detail->size,
                    'color' => $detail->color,
                    'price' => $detail->newPrice,
                    'quantity' => $detail->quantity,
                    'image' => $detail->image,
                    'subTotal' => $subTotal,
                ]);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'order not created'
            ], 422);
        }

        $shippingAddress = [
            'shipFirstName' => $order->shipFirstName,
            'shipLastName' => $order->shipLastName,
            'shipAddress' => $order->shipAddress,
            'shipCity' => $order->shipCity,
            'shipProvince' => $order->shipProvince,
            'shipZip' => $order->shipZip,
        ];

        $orderDetails = json_decode($req->orderDetails, true);
        $total = $order->total;
        $shipCharges = $order->shipCharges;
        $orderID = Hashids::encode($order->id);

        Mail::to($order->email)->queue(new orderemail($shippingAddress, $orderDetails, $total, $shipCharges, $orderID));

        return response()->json([
            'status' => true,
            'orderID' => Hashids::encode($order->id),
            'message' => 'Payment completed'
        ], 200);
    }

    public function getOrder($id)
    {
        $decoded = Hashids::decode($id);

        if (empty($decoded)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid order id',
            ], 400);
        }

        $rawID = $decoded[0];

        $rawOrder = Order::with([
            'orderDetails:id,orderID,title,size,color,price,quantity,image,subTotal'
        ])->where('id', $rawID)->first();

        if (!$rawOrder) {
            return response()->json([
                'status' => false,
                'message' => 'Orders not found',
            ], 200);
        }

        $user = Auth::user();

        $order = [
            ...$rawOrder->toArray(),
            'created_at' => $rawOrder->created_at->format('j-M-Y'),
            'id' => $id,
            'authUser' => $user ? $user->id : null
        ];

        return response()->json([
            'status' => true,
            'order' => $order,
        ], 200);
    }
}
