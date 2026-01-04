// server/services/email.ts
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const SENDER_EMAIL = process.env.SENDER_EMAIL;

if (!SENDGRID_API_KEY || !ADMIN_EMAIL || !SENDER_EMAIL) {
  throw new Error("Missing SendGrid environment variables");
}

sgMail.setApiKey(SENDGRID_API_KEY);

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: EmailData): Promise<void> {
  try {
    /* ================= ADMIN EMAIL ================= */
    await sgMail.send({
      to: ADMIN_EMAIL,
      from: SENDER_EMAIL,
      replyTo: data.email,
      subject: `New Contact Form Message from ${data.name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { margin:0; padding:0; background:#f8fafc; font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
    .container { max-width:600px; margin:36px auto; background:#fff; border-radius:10px; overflow:hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(to right,#4facfe,#ff70bc); color:#fff; padding:20px; text-align:center; }
    .content { padding:24px; color:#111827; }
    .label { font-weight:600; color:#374151; margin-top:12px; display:block; }
    .message-box { background:#f3f4f6; padding:12px; border-left:4px solid #4facfe; border-radius:6px; white-space:pre-line; margin-top:8px; }
    .footer { background:#f1f5f9; padding:14px; text-align:center; color:#6b7280; font-size:13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h3>📬 New Contact Form Submission</h3></div>
    <div class="content">
      <div class="label">Name</div><div>${data.name}</div>
      <div class="label">Email</div><div>${data.email}</div>
      <div class="label">Message</div><div class="message-box">${data.message}</div>
    </div>
    <div class="footer">This message was sent from your website's contact form.</div>
  </div>
</body>
</html>
      `
    });

    /* ================= USER CONFIRMATION EMAIL ================= */
    await sgMail.send({
      to: data.email,
      from: SENDER_EMAIL,
      replyTo: ADMIN_EMAIL,
      subject: `Thanks for contacting us, ${data.name}!`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { margin:0; padding:0; background:#f4f6f8; font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
    .container { max-width:600px; margin:36px auto; background:#fff; border-radius:10px; overflow:hidden; box-shadow: 0 6px 14px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(to right,#4facfe,#ff70bc); color:#fff; padding:18px; text-align:center; }
    .content { padding:22px; color:#111827; }
    .box { background:#f3f4f6; padding:12px; border-left:4px solid #4facfe; border-radius:6px; white-space:pre-line; }
    .footer { background:#f1f5f9; padding:12px; text-align:center; color:#6b7280; font-size:13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h3>Thanks for contacting us, ${data.name}!</h3></div>
    <div class="content">
      <p>We’ve received your message and will get back to you shortly.</p>
      <p><strong>Here’s what you sent:</strong></p>
      <div class="box">${data.message}</div>
      <p>Best regards,<br/><strong>Parbhansh Sharma</strong></p>
    </div>
    <div class="footer">This is an automated confirmation email. If you did not initiate this request, please ignore this message.</div>
  </div>
</body>
</html>
      `
    });

    console.log("✅ Both emails sent successfully using SendGrid");
  } catch (error) {
    console.error("❌ SendGrid email error:", error);
    throw new Error("Failed to send email");
  }
}
