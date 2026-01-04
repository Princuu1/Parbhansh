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

    /* ---------- ADMIN EMAIL ---------- */
    await sgMail.send({
      to: ADMIN_EMAIL,
      from: SENDER_EMAIL, // MUST be verified
      subject: `New message from ${data.name}`,
      html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    /* ---------- USER CONFIRMATION ---------- */
    await sgMail.send({
      to: data.email,
      from: SENDER_EMAIL, // MUST be same verified sender
      subject: "We received your message",
      html: `<p>Thanks for contacting us. We’ll reply soon.</p>`,
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
