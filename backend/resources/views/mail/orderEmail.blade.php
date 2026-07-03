<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmed - Forgewear</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #122324;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #a3b8b9;
        }

        .email-wrapper {
            width: 100%;
            background-color: #122324;
            padding: 40px 0;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #1c3637;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        }

        .header {
            background-color: #1a3a3b;
            padding: 35px 40px;
            text-align: center;
            border-bottom: 1px solid #254d4e;
        }

        .logo {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 2px;
            color: #ffffff;
            text-transform: uppercase;
            margin: 0 0 6px 0;
        }

        .tagline {
            font-size: 11px;
            letter-spacing: 1px;
            color: #718e8f;
            text-transform: uppercase;
            margin: 0;
        }

        .content {
            padding: 40px;
        }

        .status-title {
            font-size: 22px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 10px 0;
        }

        .status-text {
            font-size: 14px;
            color: #a3b8b9;
            margin: 0 0 24px 0;
            line-height: 1.6;
        }

        /* Badge Styles */
        .badge-container {
            margin-bottom: 30px;
        }

        .badge-order {
            background-color: #142829;
            color: #ffffff;
            font-size: 11px;
            font-weight: 600;
            padding: 6px 12px;
            border-radius: 20px;
            display: inline-block;
            margin-right: 8px;
        }

        .badge-status {
            background-color: #1b523c;
            color: #3cd070;
            font-size: 11px;
            font-weight: 600;
            padding: 6px 12px;
            border-radius: 20px;
            display: inline-block;
        }

        .section-heading {
            font-size: 14px;
            font-weight: 700;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 1px solid #274b4c;
            padding-bottom: 8px;
            margin: 30px 0 15px 0;
        }

        /* Standard Order Summary Table Styles */
        .order-table {
            width: 100%;
            border-collapse: collapse;
        }

        .product-row td {
            padding: 15px 0;
            border-bottom: 1px solid #234344;
            vertical-align: top;
        }

        .product-image {
            width: 70px;
            height: 70px;
            border-radius: 8px;
            object-fit: cover;
            display: block;
            background-color: #122324;
        }

        .product-title {
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
            margin: 0 0 4px 0;
        }

        .meta-text {
            font-size: 12px;
            color: #839d9e;
        }

        .meta-white {
            color: #ffffff;
            font-weight: 600;
        }

        .color-dot {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            vertical-align: middle;
            margin: 0 2px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Financial Breakdown Alignment */
        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        .summary-table td {
            padding: 8px 0;
            font-size: 14px;
            color: #a3b8b9;
        }

        .summary-table .total-row td {
            padding-top: 16px;
            border-top: 1px solid #274b4c;
            font-size: 16px;
            font-weight: 700;
            color: #ffffff;
        }

        /* Standard Two Column Info Block */
        .details-table {
            width: 100%;
            border-collapse: collapse;
        }

        .details-table td {
            vertical-align: top;
            font-size: 13px;
            line-height: 1.6;
            color: #a3b8b9;
        }

        .details-title {
            font-size: 12px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 6px;
        }

        .btn-action {
            display: block;
            background-color: #ffffff;
            color: #122324 !important;
            text-align: center;
            text-decoration: none;
            font-weight: 700;
            font-size: 14px;
            padding: 14px;
            border-radius: 8px;
            margin-top: 35px;
        }

        .footer {
            text-align: center;
            font-size: 11px;
            color: #617a7b;
            padding: 30px 40px;
            background-color: #1a3a3b;
            border-top: 1px solid #254d4e;
        }

        .footer a {
            color: #a3b8b9;
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <div class="email-container">

            <!-- Brand Header -->
            <div class="header">
                <div class="logo">Forgewear</div>
                <div class="tagline">Premium menswear crafted for confidence, comfort, and performance</div>
            </div>

            <!-- Email Body Content -->
            <div class="content">
                <h1 class="status-title">Order Confirmed!</h1>
                <p class="status-text">Hi {{ $shippingAddress['shipFirstName'] }},<br><br>Thank you for your purchase.
                    We have received your order details and our production team is currently preparing your items.</p>

                <div class="badge-container">
                    <span class="badge-order">Order ID: ORD-{{ $orderID }}</span>
                </div>

                <!-- Order Items Summary Section -->
                <div class="section-heading">Order Summary</div>
                <table class="order-table" role="presentation" cellspacing="0" cellpadding="0">
                    @foreach ($orderDetails as $item)
                        <tr class="product-row">
                            <!-- Image Column -->
                            <td width="85">
                                <img src="{{ asset($item['image']) }}" class="product-image" alt="{{ $item['title'] }}">
                            </td>
                            <!-- Item details Column -->
                            <td>
                                <div class="product-title">{{ $item['title'] }}</div>
                                <div class="meta-text">
                                    Size: <span class="meta-white"
                                        style="text-transform: uppercase;">{{ $item['size'] }}</span> &nbsp;&bull;&nbsp;
                                    Color: <span class="color-dot"
                                        style="background-color: {{ $item['color'] }};"></span> &nbsp;&bull;&nbsp;
                                    Qty: <span class="meta-white">{{ $item['quantity'] }}</span>
                                </div>
                            </td>
                            <!-- Pricing Column -->
                            <td style="text-align: right;" width="110">
                                <span class="meta-white" style="font-size: 14px;">PKR
                                    {{ number_format($item['newPrice'] * $item['quantity']) }}</span>
                                @if ($item['quantity'] > 1)
                                    <div class="meta-text" style="font-size: 11px; margin-top: 2px;">(PKR
                                        {{ number_format($item['newPrice']) }} each)</div>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                </table>

                <!-- Financial Statement Pricing Breakdown -->
                <table class="summary-table" role="presentation">
                    <tr>
                        <td>Subtotal</td>
                        <td style="text-align: right; color: #ffffff; font-weight: 600;">PKR
                            {{ number_format($total) }}</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td style="text-align: right; color: #ffffff; font-weight: 600;">PKR
                            {{ number_format($shipCharges) }}</td>
                    </tr>
                    <tr class="total-row">
                        <td>Total Due</td>
                        <td style="text-align: right;">PKR {{ number_format($total + $shipCharges) }}</td>
                    </tr>
                </table>

                <!-- Logistics / Delivery Details Columns -->
                <div class="section-heading">Delivery & Logistics</div>
                <table class="details-table" role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <!-- Shipping Address Information Block -->
                        <td width="50%">
                            <div class="details-title">Shipping Address</div>
                            <span
                                class="meta-white">{{ $shippingAddress['shipFirstName'] . ' ' . $shippingAddress['shipLastName'] }}</span><br>
                            {{ $shippingAddress['shipAddress'] }}<br>
                            {{ $shippingAddress['shipCity'] }}, {{ $shippingAddress['shipProvince'] }}<br>
                            {{ $shippingAddress['shipZip'] }}
                        </td>
                    </tr>
                </table>

                <!-- Action Button -->
                <a href="https://localhost:5173/order/ORD-{{ $orderID }}" class="btn-action">Track & View Your
                    Order</a>

                <p style="font-size: 12px; color: #617a7b; line-height: 1.6; text-align: center; margin: 40px 0 0 0;">
                    Need to modify your order criteria or shipping destination? Contact us immediately at
                    <a href="mailto:forgewear@gmail.com"
                        style="color: #ffffff; text-decoration: none; font-weight: 600;">forgewear@gmail.com</a>.
                </p>
            </div>

            <!-- Footer Structure -->
            <div class="footer">
                <p style="margin: 0;">&copy; {{ date('Y') }} Forgewear. All rights reserved.</p>
            </div>

        </div>
    </div>
</body>

</html>
