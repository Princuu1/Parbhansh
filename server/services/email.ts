import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

/* ===== ENV EXTRACTION (IMPORTANT) ===== */
const SENDGRID_API_KEY: string = process.env.SENDGRID_API_KEY ?? "";
const ADMIN_EMAIL: string = process.env.ADMIN_EMAIL ?? "";
const SENDER_EMAIL: string = process.env.SENDER_EMAIL ?? "";

if (!SENDGRID_API_KEY || !ADMIN_EMAIL || !SENDER_EMAIL) {
  throw new Error("Missing SendGrid environment variables");
}

sgMail.setApiKey(SENDGRID_API_KEY);

/* ===== TYPES ===== */
export interface EmailData {
  name: string;
  email: string;
  message: string;
}

/* ===== FUNCTION ===== */
export async function sendContactEmail(data: EmailData): Promise<void> {
  try {
    await sgMail.send({
      to: ADMIN_EMAIL,
      from: SENDER_EMAIL,
      replyTo: data.email,
      subject: `New Contact Form Message from ${data.name}`,
      html: `<p>${data.message}</p>`,
    });

    await sgMail.send({
      to: data.email,
      from: SENDER_EMAIL,
      replyTo: ADMIN_EMAIL,
      subject: `Thanks for contacting us, ${data.name}!`,
      html: `<p>We received your message.</p>`,
    });

    console.log("✅ Emails sent successfully");
  } catch (err) {
    console.error("❌ SendGrid error:", err);
    throw new Error("Failed to send email");
  }
}
