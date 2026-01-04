import sgMail from "@sendgrid/mail";

/* ===== TYPES ===== */
export interface EmailData {
  name: string;
  email: string;
  message: string;
}

/* ===== FUNCTION ===== */
export async function sendContactEmail(data: EmailData): Promise<void> {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const SENDER_EMAIL = process.env.SENDER_EMAIL;

  if (!SENDGRID_API_KEY || !ADMIN_EMAIL || !SENDER_EMAIL) {
    console.error("❌ Missing SendGrid env vars", {
      SENDGRID_API_KEY: !!SENDGRID_API_KEY,
      ADMIN_EMAIL: !!ADMIN_EMAIL,
      SENDER_EMAIL: !!SENDER_EMAIL,
    });
    throw new Error("Email service not configured");
  }

  sgMail.setApiKey(SENDGRID_API_KEY);

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
