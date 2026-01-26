import { z } from "zod";
import { Resend } from "resend";

const auditSchema = z.object({
  name: z.string().min(2).max(100),
  businessName: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  whatsapp: z.string().min(10).max(20),
  runningAds: z.enum(["yes", "no"]),
  primaryService: z.string().min(1),
  sourcePage: z.string().min(1),
  email: z.string().email().max(100).optional(),
  website: z.string().max(200).optional(),
});

async function sendAuditEmail(payload: any) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL;

  // verified domain only
  const FROM_EMAIL = "Leads.bd Audit <audit@mail.nodeway.link>";

  if (!RESEND_API_KEY || !TO_EMAIL) {
    console.error("[audit] Missing env:", {
      hasResendKey: !!RESEND_API_KEY,
      hasTo: !!TO_EMAIL,
    });
    return { success: false, error: "Missing RESEND_API_KEY or CONTACT_TO_EMAIL" };
  }

  const resend = new Resend(RESEND_API_KEY);

  const text =
    `New audit request\n\n` +
    `Name: ${payload.name}\n` +
    `Business: ${payload.businessName}\n` +
    `City: ${payload.city}\n` +
    `WhatsApp: ${payload.whatsapp}\n` +
    `Running Ads: ${payload.runningAds}\n` +
    `Primary Service: ${payload.primaryService}\n` +
    `Source Page: ${payload.sourcePage}\n` +
    `Email: ${payload.email || "(not provided)"}\n` +
    `Website: ${payload.website || "(not provided)"}\n`;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    subject: `Audit request received — ${payload.businessName}`,
    text,
  });

  if (error) {
    console.error("[audit] Resend error:", error);
    return { success: false, error: error.message };
  }

  console.log("[audit] Sent ok. Resend id:", data?.id);
  return { success: true, id: data?.id };
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  // body parse (safe)
  let body: any = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ success: false, error: "Invalid JSON body" });
    }
  }

  const parsed = auditSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const emailResult = await sendAuditEmail(parsed.data);

  if (!emailResult.success) {
    return res.status(500).json({ success: false, error: emailResult.error });
  }

  return res.status(200).json({ success: true, id: emailResult.id });
}
