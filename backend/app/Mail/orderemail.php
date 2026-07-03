<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class orderemail extends Mailable
{
    use Queueable, SerializesModels;
    public $shippingAddress;
    public $orderDetails;
    public $total;
    public $shipCharges;
    public $orderID;
    /**
     * Create a new message instance.
     */
    public function __construct($shippingAddress, $orderDetails, $total, $shipCharges, $orderID)
    {
        $this->shippingAddress = $shippingAddress;
        $this->orderDetails = $orderDetails;
        $this->total = $total;
        $this->shipCharges = $shipCharges;
        $this->orderID = $orderID;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Order Summary',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.orderEmail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
