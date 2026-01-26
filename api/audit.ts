import { z } from "zod";
import { Resend } from "resend";

/* -------------------- Validation schema -------------------- */
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

/* -------------------- Email sender -------------------- */
async function sendAuditEmail(payload: any) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL;

  // Verified domain only (Resend)
  const FROM_EMAIL = "Leads.bd Audit <audit@mail.nodeway.link>";

  if (!RESEND_API_KEY || !TO_EMAIL) {
    console.error("[audit] Missing env vars:", {
      hasResendKey: !!RESEND_API_KEY,
      hasTo: !!TO_EMAIL,
    });
    return { success: false, error: "Missing RESEND_API_KEY or CONTACT_TO_EMAIL" };
  }

  const resend = new Resend(RESEND_API_KEY);

  const subject = `Audit Request: ${payload.businessName}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #111111;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .logo { font-size: 22px; font-weight: 700; letter-spacing: -0.4px; color: #000; }
    .dot { color: #00C896; }
    .divider { border-top: 1px solid #f0f0f0; margin: 28px 0; }

    .h1 { font-size: 18px; font-weight: 600; margin: 0 0 6px 0; color: #111; }
    .sub { font-size: 13px; color: #666; margin: 0; }

    .section {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #999;
      font-weight: 600;
      margin: 32px 0 12px 0;
    }
    .row { margin-bottom: 16px; }
    .label { font-size: 12px; color: #777; margin-bottom: 4px; display: block; }
    .value { font-size: 15px; color: #000; font-weight: 500; line-height: 1.5; }

    .muted { color: #aaa; }
    .link { color: #0070f3; text-decoration: none; border-bottom: 1px solid #dceeff; }

    .pillYes { background: #e6fffa; color: #00a37e; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; display: inline-block; }
    .pillNo  { background: #f4f4f5; color: #666;    padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; display: inline-block; }

    .footer {
      margin-top: 48px;
      padding-top: 20px;
      border-top: 1px solid #fafafa;
      font-size: 11px;
      color: #999;
      line-height: 1.6;
    }
    .brand { margin-top: 8px; color: #777; }
  </style>
</head>

<body>
  <!-- Preheader (inbox preview text) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
    New audit request from ${payload.businessName}.
  </div>

  <div class="container">
    <div style="margin-bottom: 28px;">
      <span class="logo">leads<span class="dot">.</span></span>
    </div>

    <div class="h1">New Audit Request</div>
    <p class="sub">Submitted via Leads.bd landing page</p>

    <div class="divider"></div>

    <div class="section">Contact Details</div>

    <div class="row">
      <span class="label">Name</span>
      <div class="value">${payload.name}</div>
    </div>

    <div class="row">
      <span class="label">Email</span>
      <div class="value">
        ${
          payload.email
            ? `<a class="link" href="mailto:${payload.email}">${payload.email}</a>`
            : `<span class="muted">Not provided</span>`
        }
      </div>
    </div>

    <div class="row">
      <span class="label">WhatsApp</span>
      <div class="value">${payload.whatsapp}</div>
    </div>

    <div class="section">Business Profile</div>

    <div class="row">
      <span class="label">Business Name</span>
      <div class="value">${payload.businessName}</div>
    </div>

    <div class="row">
      <span class="label">Location</span>
      <div class="value">${payload.city}</div>
    </div>

    <div class="row">
      <span class="label">Website</span>
      <div class="value">
        ${
          payload.website
            ? `<a class="link" href="${payload.website}" target="_blank" rel="noopener noreferrer">${payload.website}</a>`
            : `<span class="muted">Not provided</span>`
        }
      </div>
    </div>

    <div class="section">Audit Scope</div>

    <div class="row">
      <span class="label">Running Ads?</span>
      <div class="value">
        ${
          payload.runningAds === "yes"
            ? `<span class="pillYes">ACTIVE</span>`
            : `<span class="pillNo">INACTIVE</span>`
        }
      </div>
    </div>

    <div class="row">
      <span class="label">Service Interest</span>
      <div class="value" style="text-transform: capitalize;">
        ${payload.primaryService}
      </div>
    </div>

    <div class="footer">
      Submitted from <strong>${payload.sourcePage}</strong><br/>
      ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}
      <div class="brand">Leads.bd — a NodeWay brand</div>
    </div>
  </div>
</body>
</html>`;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    subject,
    reply_to: payload.email || undefined,
    html,
  });

  if (error) {
    console.error("[audit] Resend error:", error);
    return { success: false, error: error.message };
  }

  console.log("[audit] Sent ok. Resend id:", data?.id);
  return { success: true, id: data?.id };
}

/* -------------------- API route handler -------------------- */
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  // Body parse (safe)
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
