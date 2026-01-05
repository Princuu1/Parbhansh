import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
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

    const { GMAIL_USER, GMAIL_APP_PASSWORD, ADMIN_EMAIL } = process.env;

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !ADMIN_EMAIL) {
      return res.status(500).json({ error: "Email config missing" });
    }

    /* ================= TRANSPORTER ================= */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    /* ================= ADMIN EMAIL ================= */
    await transporter.sendMail({
      from: `"Portfolio Contact" <${GMAIL_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: data.email,
      subject: `New Contact Form Message from ${data.name}`,
      text: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Contact Form Message</title>
</head>

<body style="margin:0;padding:0;background:#ffffff;">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td align="center" style="padding:32px 12px;">

<table width="720" cellpadding="0" cellspacing="0" role="presentation"
style="
  max-width:720px;
  width:100%;
  background:#faf7f2;
  border:1px solid #e6dccb;
  font-family:'Palatino Linotype','Book Antiqua',Palatino,serif;
  color:#3a2a1a;
">

<tr>
<td style="padding:36px 42px;">

<!-- TITLE -->
<h2 style="margin:0 0 8px;text-align:center;font-size:24px;">
New Contact Form Message
</h2>

<!-- SUBTITLE -->
<p style="
  margin:0 0 26px;
  text-align:center;
  font-size:14px;
  color:#7a6246;
  font-style:italic;
">
Someone has contacted you through your website
</p>

<!-- INTRO -->
<p style="margin:0 0 18px;font-size:15px;line-height:1.7;">
You’ve received a new message from your portfolio contact form.
The details are provided below.
</p>

<!-- DETAILS -->
<table width="100%" cellpadding="0" cellspacing="0" role="presentation"
style="margin:22px 0;">
<tr>
<td style="
  padding:14px 16px;
  background:#f4eee4;
  border-left:4px solid #c9b08a;
">
<p style="margin:0;font-size:14px;">
<strong>Name:</strong> ${data.name}
</p>
<p style="margin:6px 0 0;font-size:14px;">
<strong>Email:</strong>
<a href="mailto:${data.email}" style="color:#5c4428;text-decoration:none;">
${data.email}
</a>
</p>
</td>
</tr>
</table>

<!-- MESSAGE LABEL -->
<p style="
  margin:0 0 6px;
  font-size:12px;
  letter-spacing:1.2px;
  text-transform:uppercase;
  color:#8b6a3f;
">
Message:
</p>

<!-- MESSAGE -->
<p style="
  margin:0;
  padding-top:14px;
  border-top:1px dashed #bfa888;
  font-size:15px;
  line-height:1.8;
  white-space:pre-line;
">
${data.message}
</p>

<!-- ACTION NOTE -->
<p style="
  margin-top:26px;
  font-size:14px;
  line-height:1.6;
">
You can reply directly to this email to respond to the sender.
</p>

<!-- SIGNATURE -->
<p style="
  margin-top:28px;
  font-size:13px;
  color:#7a6246;
  font-style:italic;
">
— Sent from your portfolio contact form
</p>

</td>
</tr>
</table>

</td>
</tr>
</table>

</body>
</html>

      `,
    });

    /* ================= USER CONFIRMATION ================= */
    await transporter.sendMail({
      from: `"Parbhansh Sharma" <${GMAIL_USER}>`,
      to: data.email,
      replyTo: ADMIN_EMAIL,
      subject: "Thanks for contacting us, ${data.name}!",
      text: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>We’ve Received Your Message</title>
</head>

<body style="margin:0;padding:0;background:#ffffff;">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td align="center" style="padding:36px 12px;">

<!--[if gte mso 9]>
<v:rect xmlns:v="urn:schemas-microsoft-com:vml"
  fill="true" stroke="false"
  style="width:720px;height:780px;">
<v:fill type="frame"
  src="https://img.freepik.com/free-psd/realistic-rolled-parchment-paper-isolated_23-2151866379.jpg"
  color="#ffffff" />
<v:textbox inset="44px,44px,44px,44px">
<![endif]-->

<table width="720" cellpadding="0" cellspacing="0" role="presentation"
style="
  max-width:720px;
  width:100%;
  background-image:url('https://img.freepik.com/free-psd/realistic-rolled-parchment-paper-isolated_23-2151866379.jpg');
  background-repeat:no-repeat;
  background-size:100% 100%;
  font-family:'Palatino Linotype','Book Antiqua',Palatino,serif;
  color:#3a2a1a;
">

<tr>
<td style="padding:64px 72px;">

<!-- TITLE -->
<h2 style="margin:0 0 8px;text-align:center;font-size:24px;">
Thank You for Reaching Out
</h2>

<!-- SUBTITLE -->
<p style="
  margin:0 0 26px;
  text-align:center;
  font-size:14px;
  color:#7a6246;
  font-style:italic;
">
We’ve successfully received your message
</p>

<!-- GREETING -->
<p style="margin:0 0 14px;font-size:15px;">
Dear <strong>${data.name}</strong>,
</p>

<p style="margin:0 0 18px;font-size:15px;line-height:1.7;">
Thank you for getting in touch. This email is to confirm that your message
has reached us safely. We appreciate you taking the time to write.
</p>

<!-- DETAILS (EARLIER STYLE + TRANSPARENT) -->
<table width="100%" cellpadding="0" cellspacing="0" role="presentation"
style="margin:22px 0;">
<tr>
<td style="
  padding:14px 16px;
  background:rgba(255,255,255,0.25);
  border-left:4px solid #c9b08a;
">
<p style="margin:0;font-size:14px;">
<strong>Your name:</strong> ${data.name}
</p>
<p style="margin:6px 0 0;font-size:14px;">
<strong>Your email:</strong> ${data.email}
</p>
</td>
</tr>
</table>

<!-- MESSAGE LABEL -->
<p style="
  margin:0 0 6px;
  font-size:12px;
  letter-spacing:1.2px;
  text-transform:uppercase;
  color:#8b6a3f;
">
Here’s what you sent:
</p>

<!-- MESSAGE -->
<p style="
  margin:0;
  padding-top:14px;
  border-top:1px dashed #bfa888;
  font-size:15px;
  line-height:1.8;
  white-space:pre-line;
">
${data.message}
</p>

<!-- RESPONSE INFO -->
<p style="
  margin-top:26px;
  font-size:14px;
  line-height:1.6;
">
We’ll review your message and get back to you as soon as possible.
If your inquiry is urgent, please feel free to reply directly to this email.
</p>

<!-- SIGNATURE -->
<p style="
  margin-top:28px;
  font-size:13px;
  color:#7a6246;
  font-style:italic;
">
Warm regards,<br>
<strong>Parbhansh Sharma</strong>
</p>

<!-- FOOTER -->
<p style="
  margin-top:26px;
  text-align:center;
  font-size:12px;
  color:#8a7358;
">
This is an automated confirmation email.<br>
If you did not submit this message, you may safely ignore it.
</p>

</td>
</tr>
</table>

<!--[if gte mso 9]>
</v:textbox>
</v:rect>
<![endif]-->

</td>
</tr>
</table>

</body>
</html>

      `,
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("EMAIL ERROR:", err);
    return res.status(500).json({
      error: "Email sending failed",
      details: err?.message,
    });
  }
}
