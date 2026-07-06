<?php

use App\Http\Controllers\Admin\AdminFAQController;
use App\Http\Controllers\Admin\AdminMediaLibraryController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminReviewController;
use App\Http\Controllers\Admin\AdminShipChargesController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\MediaLibraryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\User\UserOrderController;
use App\Http\Controllers\User\UserReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::get('/user/verify', [AuthController::class, 'verifyLogin'])->middleware('auth:sanctum');

Route::get('/run-queue', function (Request $request) {
    // Add a simple security key so strangers cannot abuse your endpoint
    $securityKey = '@QueueSecretKey#40'; // Change this to a unique word

    if ($request->query('key') !== $securityKey) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Call the queue worker to process jobs and stop once empty
    Artisan::call('queue:work', [
        '--stop-when-empty' => true,
        '--time-limit' => 20, // Run for a max of 20 seconds to prevent Render PHP timeouts
    ]);

    return response()->json(['status' => 'Queue worker executed successfully']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/admin/product/{category}', [AdminProductController::class, 'add']);
    Route::get('/admin/product/{category}/{id}', [AdminProductController::class, 'edit']);
    Route::put('/admin/product/{category}/{id}', [AdminProductController::class, 'update']);
    Route::delete('/admin/product/{category}', [AdminProductController::class, 'delete']);


    Route::get('/admin/order', [AdminOrderController::class, 'getAllOrders']);
    Route::get('/admin/order/pending', [AdminOrderController::class, 'getAllPendingOrders']);
    Route::get('/admin/order/delivered', [AdminOrderController::class, 'getAllDeliveredOrders']);
    Route::get('/admin/order/cancelled', [AdminOrderController::class, 'getAllCancelledOrders']);
    Route::get('/admin/order/search', [AdminOrderController::class, 'getSearchedOrder']);
    Route::get('/admin/order/status/{id}', [AdminOrderController::class, 'changeOrderStatus']);
    Route::put('/admin/order/cancel/{id}', [AdminOrderController::class, 'cancelOrder']);
    Route::get('/admin/dashboard/order', [AdminOrderController::class, 'getOrdersForDashboard']);
    Route::get('/user/order', [UserOrderController::class, 'getUserOrders']);


    Route::get('/admin/review', [AdminReviewController::class, 'getAllReviews']);
    Route::get('/admin/review/private', [AdminReviewController::class, 'getAllPrivateReviews']);
    Route::get('/admin/review/public', [AdminReviewController::class, 'getAllPublicReviews']);
    Route::get('/admin/review/search', [AdminReviewController::class, 'getSearchedReview']);
    Route::get('/admin/review/status/{id}', [AdminReviewController::class, 'changeReviewStatus']);
    Route::delete('/admin/review/delete/{id}', [AdminReviewController::class, 'deleteReview']);
    Route::get('/admin/dashboard/review', [AdminReviewController::class, 'getReviewsForDashboard']);
    Route::get('/user/review', [UserReviewController::class, 'getUserReviews']);

    Route::post('/admin/media/library/add', [AdminMediaLibraryController::class, 'addMediaLibrary']);

    Route::post('/admin/shipcharges', [AdminShipChargesController::class, 'shipCharges']);
    Route::get('/admin/shipcharges', [AdminShipChargesController::class, 'getShipCharges']);

    Route::get('/admin/faq', [AdminFAQController::class, 'getAllFaq']);
    Route::post('/admin/faq/add', [AdminFAQController::class, 'addFaq']);
    Route::get('/admin/faq/edit/{id}', [AdminFAQController::class, 'editFaq']);
    Route::put('/admin/faq/update/{id}', [AdminFAQController::class, 'updateFaq']);
    Route::delete('/admin/faq/{id}', [AdminFAQController::class, 'deleteFaq']);

    Route::get('/admin/dashboard/products', [AdminProductController::class, 'getProductsForDashboards']);
    Route::get('/admin/{category}/all', [AdminProductController::class, 'getAllProducts']);
    Route::get('/admin/{category}/enabled', [AdminProductController::class, 'getAllEnabledProducts']);
    Route::get('/admin/{category}/{id}/single', [AdminProductController::class, 'getSingleProduct']);
    Route::get('/admin/{category}/disabled', [AdminProductController::class, 'getAllDisabledProducts']);
    Route::get('/admin/{category}/instock', [AdminProductController::class, 'getInStockProducts']);
    Route::get('/admin/{category}/outstock', [AdminProductController::class, 'getOutStockProducts']);
    Route::get('/admin/{category}/search', [AdminProductController::class, 'getSearchedProducts']);
    Route::put('/admin/{category}/{id}/change/stock', [AdminProductController::class, 'changeStock']);
    Route::put('/admin/{category}/{id}/change/status', [AdminProductController::class, 'changeStatus']);

    Route::put('/profile/update', [UserController::class, 'profileUpdate']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/media/library', [MediaLibraryController::class, 'getMediaLibrary']);

Route::get('/home/bestseller', [ProductController::class, 'getBestSellerProducts']);
Route::get('/home/newarrival', [ProductController::class, 'getNewArrivalProducts']);

Route::get('/cart/{ids}', [ProductController::class, 'getCartProducts']);
Route::get('/validate/{ids}', [ProductController::class, 'validateCartProducts']);

Route::post('/place/order', [OrderController::class, 'placeOrder']);
Route::get('/order/{id}', [OrderController::class, 'getOrder']);

Route::get('/{category}/store', [ProductController::class, 'getStoreProducts']);
Route::get('/{category}/sale', [ProductController::class, 'getSaleProducts']);
Route::get('/{category}/{id}/single', [ProductController::class, 'getSingleProduct']);

Route::get('/faq', [FAQController::class, 'getAllFaq']);

Route::get('/review/home', [ReviewController::class, 'getAllReview']);
Route::get('/review/detail/{id}', [ReviewController::class, 'getDetailReview']);
Route::post('/review/add', [ReviewController::class, 'addReview']);
Route::get('/review/verification/{productID}', [ReviewController::class, 'verifyToWriteReview']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signUp']);
