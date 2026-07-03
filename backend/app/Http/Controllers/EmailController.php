<?php

namespace App\Http\Controllers;

use App\Mail\orderemail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendEmail()
    {
        // $toEmail = 'faheelansari8@gmail.com';
        // $subject = 'Order Summary';
        // $message = 'Your order is completed successfullyy';

        // Mail::to($toEmail)->send(new orderemail($message, $subject));
    }
}
