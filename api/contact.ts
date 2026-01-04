import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { sendContactEmail } from "../server/services/email";

/* ===== Schema ===== */
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  /* ===== CORS ===== */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    console.log("📩 Incoming contact request:", req.body);

    const data = contactSchema.parse(req.body);

    await sendContactEmail({
      name: data.name,
      email: data.email,
      message: data.message,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("🔥 Contact API error:", error);

    return res.status(500).json({
      error: error?.message || "Internal Server Error",
    });
  }
}
