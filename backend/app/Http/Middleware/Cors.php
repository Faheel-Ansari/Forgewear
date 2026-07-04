<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    public function handle(Request $request, Closure $next)
    {
        // 1. If it's a preflight OPTIONS request, handle it instantly and return a 204 response
        if ($request->isMethod('OPTIONS')) {
            return response('', 204)
                ->header('Access-Control-Allow-Origin', 'https://forgewear-store.vercel.app')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With, X-CSRF-TOKEN')
                ->header('Access-Control-Allow-Credentials', 'true');
        }

        // 2. For standard GET/POST requests, let them pass through and attach the headers to the final response
        $response = $next($request);
        
        if (method_exists($response, 'header')) {
            $response->header('Access-Control-Allow-Origin', 'https://forgewear-store.vercel.app')
                     ->header('Access-Control-Allow-Credentials', 'true');
        }

        return $response;
    }
}