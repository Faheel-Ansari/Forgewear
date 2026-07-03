<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getBestSellerProducts()
    {
        $bestSellerProducts = Product::has('productRating')
            ->withAvg('productRating as average_rating', 'rating')
            ->where('status', 'true')
            ->orderByDesc('average_rating')
            ->get();

        if ($bestSellerProducts->count() <= 0) {
            return response()->json([
                "status" => false,
                'message' => 'No products found!'
            ], 200);
        }
        return response()->json([
            "status" => true,
            "products" => $bestSellerProducts
        ], 200);
    }

    public function getNewArrivalProducts()
    {
        $newArrivalProducts = Product::where('isNew', 'true')->where('status', 'true')->get();

        if ($newArrivalProducts->count() <= 0) {
            return response()->json([
                "status" => false,
                'message' => 'No products found!'
            ], 200);
        }
        return response()->json([
            "status" => true,
            "products" => $newArrivalProducts
        ], 200);
    }

    public function getStoreProducts(Request $request, $category)
    {
        $perPage = $request->query('perPage');
        $filtersRaw = $request->query('filters', []);
        $filters = json_decode($filtersRaw, true) ?: [];

        $query = Product::where('category', $category)
            ->where('status', 'true');

        if (!empty($filters['price'])) {

            $query->where('newPrice', '<=', $filters['price']);
        }

        if (!empty($filters['size'])) {
            $query->whereJsonContains('sizes', ['value' => $filters['size']]);
        }

        if (!empty($filters['stock'])) {
            $query->where('avail', $filters['stock']);
        }

        if (!empty($filters['sort'])) {

            if ($filters['sort'] === 'new') {
                $query->where('isNew', 'true');

            } elseif ($filters['sort'] === 'lowtohigh') {
                $query->orderBy('newPrice', 'asc');

            } else {
                $query->orderBy('newPrice', 'desc');

            }
        }

        $storeProducts = $query->paginate($perPage);

        if ($storeProducts->isEmpty()) {
            return response()->json([
                "status" => false,
                "message" => "No products found!"
            ], 200);
        }

        return response()->json([
            "status" => true,
            "products" => $storeProducts->items(),
            "pagination" => [
                "current_page" => $storeProducts->currentPage(),
                "last_page" => $storeProducts->lastPage(),
                "total" => $storeProducts->total(),
                "per_page" => $storeProducts->perPage()
            ]
        ], 200);
    }

    public function getSaleProducts(Request $request, $category)
    {
        $perPage = $request->query('perPage');
        $filtersRaw = $request->query('filters', []);
        $filters = json_decode($filtersRaw, true) ?: [];

        $query = Product::where('category', $category)
            ->where('status', 'true')->where('oldPrice', '!=', 'null');

        if (!empty($filters['price'])) {

            $query->where('newPrice', '<=', $filters['price']);
        }

        if (!empty($filters['size'])) {
            $query->whereJsonContains('sizes', ['value' => $filters['size']]);
        }

        if (!empty($filters['stock'])) {
            $query->where('avail', $filters['stock']);
        }

        if (!empty($filters['sort'])) {

            if ($filters['sort'] === 'new') {
                $query->where('isNew', 'true');

            } elseif ($filters['sort'] === 'lowtohigh') {
                $query->orderBy('newPrice', 'asc');

            } else {
                $query->orderBy('newPrice', 'desc');

            }
        }

        $saleProducts = $query->paginate($perPage);

        if ($saleProducts->count() <= 0) {
            return response()->json([
                "status" => false,
                'message' => 'No products found!'
            ], 200);
        }
        return response()->json([
            "status" => true,
            "products" => $saleProducts->items(),
            "pagination" => [
                "current_page" => $saleProducts->currentPage(),
                "last_page" => $saleProducts->lastPage(),
                "total" => $saleProducts->total(),
                "per_page" => $saleProducts->perPage()
            ]
        ], 200);
    }

    public function getSingleProduct($category, $id)
    {
        $singleProduct = Product::where('id', $id)->where('category', $category)->where('status', 'true')->first();
        return response()->json([
            'status' => true,
            'singleProduct' => $singleProduct
        ], 200);
    }

    public function getCartProducts($ids)
    {
        $idsArray = explode(',', $ids);
        $selectedProducts = Product::whereIn('id', $idsArray)->get();
        if ($selectedProducts->count() <= 0) {
            return response()->json([
                'status' => false,
                'message' => 'No products found!'
            ], 200);
        }
        return response()->json([
            'status' => true,
            'products' => $selectedProducts
        ], 200);
    }

    public function validateCartProducts($ids)
    {
        $idsArray = explode(',', $ids);
        $selectedProducts = Product::whereIn('id', $idsArray)->get();

        if ($selectedProducts->count() <= 0) {
            return response()->json([
                'status' => false,
                'products' => []
            ], 200);
        }

        foreach ($selectedProducts as $key => $product) {
            if ($product->avail === "false" || $product->status === "false") {
                return response()->json([
                    'status' => false,
                    'products' => $selectedProducts
                ], 200);
            }
        }

        return response()->json([
            'status' => true,
            'products' => $selectedProducts
        ], 200);
    }
}
