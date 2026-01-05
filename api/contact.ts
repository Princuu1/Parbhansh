import type { VercelRequest, VercelResponse } from "@vercel/node";
import sgMail from "@sendgrid/mail";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const data = schema.parse(body);

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const SENDER_EMAIL = process.env.SENDER_EMAIL;

    if (!SENDGRID_API_KEY || !ADMIN_EMAIL || !SENDER_EMAIL) {
      console.error("❌ Missing env vars");
      return res.status(500).json({ error: "Email config missing" });
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    /* ================= ADMIN EMAIL ================= */
    await sgMail.send({
      to: ADMIN_EMAIL,
      from: SENDER_EMAIL,              // verified sender
      replyTo: data.email,             // 👈 reply goes to user
      subject: `New Contact Form Message from ${data.name}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Portfolio Contact Message</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
      color: #3a2a1a;
    }

    .wrapper {
      width: 100%;
      padding: 30px 0;
      display: flex;
      justify-content: center;
    }

    .parchment-container {
      position: relative;
      width: 720px;
      max-width: 94%;
    }

    .parchment-container img {
      width: 100%;
      height: auto;
      display: block;
    }

    /* TEXT WRITTEN ON IMAGE */
    .parchment-text {
      position: absolute;
      top: 10%;
      left: 12%;
      right: 12%;
      box-sizing: border-box;
      text-align: center;

      /* subtle readability support */
      background: rgba(255, 255, 255, 0.15);
      padding: 20px;
      border-radius: 6px;
    }

    .title {
      font-size: 24px;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }

    .subtitle {
      font-size: 13px;
      color: #7a6246;
      margin-bottom: 22px;
      font-style: italic;
    }

    .info {
      margin-bottom: 18px;
    }

    .label {
      font-size: 11px;
      letter-spacing: 1.6px;
      text-transform: uppercase;
      color: #8b6a3f;
      margin-bottom: 3px;
    }

    .value {
      font-size: 15px;
      line-height: 1.6;
    }

    .message {
      margin-top: 22px;
      padding-top: 16px;
      border-top: 1px dashed #bfa888;
      font-size: 16px;
      line-height: 1.8;
      white-space: pre-line;
      text-align: left;
    }

    .signature {
      margin-top: 26px;
      font-size: 12px;
      color: #7a6246;
      font-style: italic;
      text-align: center;
    }

    @media (max-width: 600px) {
      .parchment-text {
        top: 9%;
        left: 10%;
        right: 10%;
        padding: 16px;
      }

      .title {
        font-size: 21px;
      }

      .message {
        font-size: 14px;
      }
    }
  </style>
</head>

<body>
  <div class="wrapper">

    <div class="parchment-container">
      <img
        src="https://img.freepik.com/free-psd/realistic-rolled-parchment-paper-isolated_23-2151866379.jpg"
        alt="Old parchment paper"
      />

      <div class="parchment-text">
        <div class="title">You Have a New Portfolio Message</div>
        <div class="subtitle">Someone contacted you through your website</div>

        <div class="info">
          <div class="label">From</div>
          <div class="value">${data.name}</div>
        </div>

        <div class="info">
          <div class="label">Email</div>
          <div class="value">${data.email}</div>
        </div>

        <div class="message">
${data.message}
        </div>

        <div class="signature">
          — Sent from your portfolio contact form
        </div>
      </div>
    </div>

  </div>
</body>
</html>

      `,
    });

    /* ================= USER CONFIRMATION EMAIL ================= */
    await sgMail.send({
      to: data.email,
      from: SENDER_EMAIL,              // verified sender
      replyTo: ADMIN_EMAIL,            // 👈 reply goes to admin
      subject: "We received your message",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Message Received</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
      color: #3a2a1a;
    }

    .wrapper {
      width: 100%;
      padding: 30px 0;
      display: flex;
      justify-content: center;
    }

    .parchment-container {
      position: relative;
      width: 720px;
      max-width: 94%;
    }

    .parchment-container img {
      width: 100%;
      height: auto;
      display: block;
    }

    /* TEXT ON PARCHMENT */
    .parchment-text {
      position: absolute;
      top: 10%;
      left: 12%;
      right: 12%;
      text-align: center;
      box-sizing: border-box;
    }

    .title {
      font-size: 24px;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .subtitle {
      font-size: 14px;
      color: #7a6246;
      margin-bottom: 24px;
      font-style: italic;
    }

    .content {
      font-size: 15px;
      line-height: 1.7;
      text-align: left;
    }

    .details {
      margin: 20px 0;
      padding-left: 10px;
      border-left: 2px solid #c9b08a;
    }

    .details strong {
      color: #5c4428;
    }

    .message-box {
      margin-top: 18px;
      padding-top: 14px;
      border-top: 1px dashed #bfa888;
      white-space: pre-line;
    }

    .signature {
      margin-top: 28px;
      font-size: 13px;
      color: #7a6246;
      font-style: italic;
      text-align: center;
    }

    .footer-note {
      margin-top: 18px;
      font-size: 12px;
      color: #8a7358;
      text-align: center;
    }

    @media (max-width: 600px) {
      .parchment-text {
        top: 9%;
        left: 10%;
        right: 10%;
      }

      .title {
        font-size: 21px;
      }

      .content {
        font-size: 14px;
      }
    }
  </style>
</head>

<body>
  <div class="wrapper">

    <div class="parchment-container">
      <img
        src="https://img.freepik.com/free-psd/realistic-rolled-parchment-paper-isolated_23-2151866379.jpg"
        alt="Old parchment paper"
      />

      <div class="parchment-text">
        <div class="title">Thank You for Reaching Out</div>
        <div class="subtitle">Your message has been received</div>

        <div class="content">
          <p>
            Dear <strong>${data.name}</strong>,
          </p>

          <p>
            Thank you for contacting us. We have received your message and will
            get back to you as soon as possible.
          </p>

          <div class="details">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
          </div>

          <div class="message-box">
            ${data.message}
          </div>

          <p class="signature">
            Best regards,<br />
            <strong>Parbhansh Sharma</strong>
          </p>

          <div class="footer-note">
            This is an automated confirmation email.  
            If you did not initiate this request, please ignore this message.
          </div>
        </div>
      </div>
    </div>

  </div>
</body>
</html>

      `,
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("🔥 SENDGRID ERROR:", err?.response?.body || err);
    return res.status(500).json({
      error: "Email sending failed",
      details: err?.response?.body || err?.message,
    });
  }
}
