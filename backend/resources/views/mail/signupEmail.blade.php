<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Forgewear</title>
    <style>
        /* Reset & Base Styles */
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        table {
            border-collapse: collapse !important;
        }

        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            background-color: #1a2e2b;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #cfdad7;
        }

        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #1a2e2b;
            padding-top: 40px;
            padding-bottom: 40px;
        }

        .main-table {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #132220;
            border: 1px solid #233d39;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }

        /* Header */
        .header-bg {
            background-color: #0e1a18;
            padding: 35px 20px;
            text-align: center;
            border-bottom: 2px solid #29bda3;
        }

        .logo-text {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 5px;
            color: #FFFFFF;
            text-transform: uppercase;
            margin: 0;
        }

        /* Hero Callout section */
        .hero-section {
            text-align: center;
            padding: 45px 40px 35px 40px;
            border-bottom: 1px solid #1c3330;
        }

        h1 {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: 1px;
            color: #FFFFFF;
            margin-top: 0;
            margin-bottom: 16px;
            text-transform: uppercase;
        }

        .hero-subtitle {
            font-size: 16px;
            line-height: 1.6;
            color: #b3c4c0;
            margin: 0;
        }

        /* Content Blocks */
        .content-body {
            padding: 40px;
        }

        p {
            font-size: 14px;
            line-height: 1.6;
            color: #9bb0ac;
            margin-top: 0;
            margin-bottom: 24px;
        }

        /* Core Features Grid Layout */
        .features-grid {
            width: 100%;
            margin: 30px 0;
        }

        .feature-cell {
            padding: 10px;
            vertical-align: top;
            text-align: center;
        }

        .feature-card {
            background-color: #192c29;
            border: 1px solid #233d39;
            border-radius: 8px;
            padding: 24px 16px;
            height: 100%;
        }

        .feature-icon {
            font-size: 26px;
            color: #29bda3;
            margin-bottom: 12px;
            display: inline-block;
            line-height: 1;
        }

        .feature-title {
            font-size: 14px;
            font-weight: 700;
            color: #FFFFFF;
            margin: 0 0 8px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .feature-desc {
            font-size: 12px;
            color: #8fa39f;
            margin: 0;
            line-height: 1.5;
        }

        /* Bottom Signoff Elements */
        .signoff-box {
            margin-top: 35px;
            padding-top: 25px;
            border-top: 1px solid #1c3330;
        }

        /* Footer Customization */
        .footer {
            background-color: #0e1a18;
            padding: 35px 20px;
            text-align: center;
            border-top: 1px solid #1c3330;
        }

        .footer-text {
            font-size: 11px;
            color: #566e6a;
            line-height: 1.6;
            margin: 0 0 8px 0;
        }

        .footer-text a {
            color: #8fa39f;
            text-decoration: underline;
        }
    </style>
</head>

<body>

    <div class="wrapper">
        <table class="main-table" cellpadding="0" cellspacing="0" role="presentation">

            <!-- Brand Identifier Header -->
            <tr>
                <td class="header-bg">
                    <div class="logo-text">FORGEWEAR</div>
                </td>
            </tr>

            <!-- Structural Hero Layout Block -->
            <tr>
                <td class="hero-section">
                    <h1>Welcome to the Forge</h1>
                    <p class="hero-subtitle">We’re thrilled to have you with us. Forgewear isn't just about clothing;
                        it’s about sharp design, raw precision, and building a wardrobe that leaves an impression.</p>
                </td>
            </tr>

            <!-- Core Content Area -->
            <tr>
                <td class="content-body">
                    <p>We are dedicated to providing premium apparel that seamlessly combines modern street-ready style
                        with everyday utility. As a member of our community, you now have priority access to exclusive
                        drops, curated lookbooks, and private member-only essentials.</p>

                    <!-- Standard Email 3-Column Features Grid Layout -->
                    <table class="features-grid" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tr>
                            <!-- Feature One Block -->
                            <td class="feature-cell" width="33.33%">
                                <div class="feature-card">
                                    <div class="feature-icon">⚡</div>
                                    <h3 class="feature-title">Latest Drops</h3>
                                    <p class="feature-desc">Be the first to secure our limited-run drops, engineered for
                                        performance.</p>
                                </div>
                            </td>
                            <!-- Feature Two Block -->
                            <td class="feature-cell" width="33.33%">
                                <div class="feature-card">
                                    <div class="feature-icon">🛡️</div>
                                    <h3 class="feature-title">Essentials</h3>
                                    <p class="feature-desc">Clean, high-grade base layers and tactical garments at your
                                        core.</p>
                                </div>
                            </td>
                            <!-- Feature Three Block -->
                            <td class="feature-cell" width="33.33%">
                                <div class="feature-card">
                                    <div class="feature-icon">📊</div>
                                    <h3 class="feature-title">Dashboard</h3>
                                    <p class="feature-desc">Track orders and manage preferences seamlessly in your
                                        account.</p>
                                </div>
                            </td>
                        </tr>
                    </table>

                    <!-- Operational Standby Notification -->
                    <div class="signoff-box">
                        <p style="margin-bottom: 25px;">Our support crew is always on standby to keep your experience
                            flawless. If you have any inquiries regarding fit, sizing, or an order, simply reply
                            directly to this email.</p>

                        <table cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                                <td>
                                    <p
                                        style="margin: 0; font-weight: 700; color: #FFFFFF; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Stay Sharp,</p>
                                    <p
                                        style="margin: 4px 0 0 0; color: #D4AF37; font-size: 14px; font-family: Georgia, serif; font-style: italic;">
                                        The Forgewear Team</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>

            <!-- Standardized Transactional Footer -->
            <tr>
                <td class="footer">
                    <p class="footer-text">You are receiving this email because you registered an account with
                        Forgewear.</p>
                    <p class="footer-text">&copy; 2026 Forgewear Apparel Co. All Rights Reserved.</p>
                </td>
            </tr>

        </table>
    </div>

</body>

</html>
