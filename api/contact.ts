import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertContactSchema } from "../shared/schema";
import { sendContactEmail } from "../server/services/email";

/* ===== FORCE NODE RUNTIME ===== */
export const config = {
  runtime: "nodejs20.x",
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  /* ===== CORS HEADERS (MUST BE FIRST) ===== */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  /* ===== HANDLE PREFLIGHT ===== */
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  /* ===== ALLOW ONLY POST ===== */
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data = insertContactSchema.parse(req.body);

    await sendContactEmail({
      name: data.name,
      email: data.email,
      message: data.message,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("API ERROR:", error);
    return res.status(400).json({ message: error.message });
  }
}
