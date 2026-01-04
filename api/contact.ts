import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertContactSchema } from "../shared/schema";
import { sendContactEmail } from "../server/services/email";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  /* ===== CORS PREFLIGHT ===== */
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  /* ===== ALLOW ONLY POST ===== */
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = insertContactSchema.parse(req.body);

    await sendContactEmail({
      name: data.name,
      email: data.email,
      message: data.message
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("API error:", error);
    return res.status(400).json({ message: error.message });
  }
}
