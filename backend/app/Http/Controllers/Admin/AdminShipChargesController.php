<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ShippingCharges;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminShipChargesController extends Controller
{
    public function shipCharges(Request $req)
    {
        $validation = Validator::make($req->all(), ['charges' => 'numeric|min:0']);

        if ($validation->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid charges!'
            ], 200);
        }

        $charges = ShippingCharges::first();

        if ($charges) {
            $charges->charges = $req->charges;
            $charges->save();
        } else {
            $charges = ShippingCharges::create(['charges' => $req->charges]);
        }

        if ($charges) {
            return response()->json([
                'status' => true,
                'message' => 'Charges Updated Successfully.'
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!'
            ], 402);
        }
    }

    public function getShipCharges()
    {
        $charges = ShippingCharges::first();

        if ($charges) {
            return response()->json([
                'status' => true,
                'charges' => $charges->charges
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Charges Not Found'
            ], 402);
        }
    }
}
