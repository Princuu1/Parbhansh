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
New portfolio message

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
      `,
      html: `
<h2>New Portfolio Message</h2>
<p><strong>From:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<hr />
<p style="white-space:pre-line;">${data.message}</p>
      `,
    });

    /* ================= USER CONFIRMATION ================= */
    await transporter.sendMail({
      from: `"Parbhansh Sharma" <${GMAIL_USER}>`,
      to: data.email,
      replyTo: ADMIN_EMAIL,
      subject: "We’ve received your message",
      text: `
Hi ${data.name},

Thanks for reaching out! We’ve received your message and will reply soon.

Here’s what you sent:
${data.message}

— Parbhansh Sharma
      `,
      html: `
<h2>Thank you for reaching out</h2>

<p>Dear <strong>${data.name}</strong>,</p>

<p>
This email confirms that we have received your message.
We’ll get back to you as soon as possible.
</p>

<p style="margin-top:16px;font-size:13px;color:#555;">
<strong>Here’s what you sent:</strong>
</p>

<p style="white-space:pre-line;border-top:1px dashed #ccc;padding-top:10px;">
${data.message}
</p>

<p style="margin-top:20px;font-style:italic;">
Warm regards,<br />
<strong>Parbhansh Sharma</strong>
</p>
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
