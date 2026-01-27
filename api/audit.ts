import { Resend } from "resend";
import { z } from "zod";

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

export default async function handler(req: any, res: any) {
  try {
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

    const payload = parsed.data;

    const FROM_EMAIL = "Leads.bd Audit <audit@mail.nodeway.link>";
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY || !TO_EMAIL) {
      console.error("[audit] Missing env vars", {
        has_RESEND_API_KEY: !!RESEND_API_KEY,
        has_CONTACT_TO_EMAIL: !!TO_EMAIL,
      });
      return res
        .status(500)
        .json({ success: false, error: "Missing RESEND_API_KEY or CONTACT_TO_EMAIL" });
    }

    const resend = new Resend(RESEND_API_KEY);

    // --------------------
    // Helpers (security + data quality)
    // --------------------
    const escapeHtml = (input: unknown) => {
      const s = String(input ?? "");
      return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    };

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const normalizeUrl = (raw: unknown) => {
      const s = String(raw ?? "").trim();
      if (!s) return null;

      const withProto = /^https?:\/\//i.test(s) ? s : `https://${s}`;
      try {
        const u = new URL(withProto);
        if (u.protocol !== "http:" && u.protocol !== "https:") return null;
        return u.toString();
      } catch {
        return null;
      }
    };

    const normalizeWhatsappDigits = (raw: unknown) => {
      const s = String(raw ?? "").trim();
      if (!s) return null;

      let digits = s.replace(/[^\d]/g, "");

      // BD local format 01XXXXXXXXX => 8801XXXXXXXXX
      if (digits.length === 11 && digits.startsWith("01")) {
        digits = `88${digits}`;
      }

      // 00XXXXXXXX => XXXXXX
      if (digits.startsWith("00")) {
        digits = digits.slice(2);
      }

      if (digits.length < 10 || digits.length > 15) return null;
      return digits;
    };

    // --------------------
    // Subject + sanitized fields
    // --------------------
    const emailSubject = `Audit Request: ${payload.businessName}`;

    const nameSafe = escapeHtml(payload.name);
    const businessNameSafe = escapeHtml(payload.businessName);
    const citySafe = escapeHtml(payload.city);
    const primaryServiceSafe = escapeHtml(payload.primaryService);
    const sourcePageSafe = escapeHtml(payload.sourcePage);

    const emailRaw = String(payload.email ?? "").trim();
    const customerEmail = emailRaw && isValidEmail(emailRaw) ? emailRaw : "";
    const customerEmailSafe = escapeHtml(customerEmail);

    const websiteNormalized = normalizeUrl(payload.website);
    const websiteTextRaw = String(payload.website ?? "").trim();
    const websiteTextSafe = escapeHtml(websiteTextRaw);

    const whatsappRaw = String(payload.whatsapp ?? "").trim();
    const whatsappRawSafe = escapeHtml(whatsappRaw);
    const waDigits = normalizeWhatsappDigits(whatsappRaw);
    const waLink = waDigits ? `https://wa.me/${waDigits}` : "";

    const timestampDhaka = escapeHtml(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
    );

    // --------------------
    // Email HTML (copy locked + Apple-style soft colors)
    // --------------------
    const emailHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(emailSubject)}</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #ffffff;
        color: #374151;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 20px;
      }

      .logo {
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.5px;
        color: #111827;
      }

      .dot {
        color: #00c896;
      }

      .divider {
        border-top: 1px solid #f0f0f0;
        margin: 30px 0;
      }

      .h1 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 6px 0;
        letter-spacing: -0.2px;
        color: #1f2937;
      }

      .sub {
        font-size: 13px;
        color: #6b7280;
        margin: 0;
      }

      .section {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #9ca3af;
        font-weight: 600;
        margin: 32px 0 12px 0;
      }

      .row {
        margin-bottom: 16px;
      }

      .label {
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 4px;
        display: block;
      }

      .value {
        font-size: 15px;
        color: #374151;
        font-weight: 500;
        line-height: 1.5;
      }

      .muted {
        color: #9ca3af;
        font-style: italic;
      }

      .link {
        color: #0aa982;
        text-decoration: none;
        border-bottom: 1px solid rgba(10, 169, 130, 0.25);
      }

      .link:hover {
        border-bottom-color: rgba(10, 169, 130, 0.5);
      }

      .pillYes {
        background: #e6fffa;
        color: #00a37e;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.5px;
        display: inline-block;
      }

      .pillNo {
        background: #f4f4f5;
        color: #6b7280;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.5px;
        display: inline-block;
      }

      .footer {
        margin-top: 50px;
        padding-top: 20px;
        border-top: 1px solid #fafafa;
      }

      .footer-text {
        font-size: 11px;
        color: #9ca3af;
        line-height: 1.6;
      }

      .brandline {
        font-size: 11px;
        color: #9ca3af;
        margin-top: 8px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div style="margin-bottom: 30px">
        <span class="logo">leads<span class="dot">.</span></span>
      </div>

      <h1 class="h1">New Audit Request</h1>
      <p class="sub">Submitted via Leads.bd landing page</p>

      <div class="divider"></div>

      <div class="section">CONTACT DETAILS</div>

      <div class="row">
        <span class="label">Name</span>
        <div class="value">${nameSafe}</div>
      </div>

      <div class="row">
        <span class="label">Email</span>
        <div class="value">
          ${
            customerEmail
              ? `<a href="mailto:${customerEmailSafe}" class="link">${customerEmailSafe}</a>`
              : `<span class="muted">Not provided</span>`
          }
        </div>
      </div>

      <div class="row">
        <span class="label">WhatsApp</span>
        <div class="value">
          ${
            waLink
              ? `<a href="${waLink}" class="link" target="_blank">${whatsappRawSafe}</a>`
              : whatsappRawSafe || `<span class="muted">Not provided</span>`
          }
        </div>
      </div>

      <div class="section">BUSINESS PROFILE</div>

      <div class="row">
        <span class="label">Business Name</span>
        <div class="value">${businessNameSafe}</div>
      </div>

      <div class="row">
        <span class="label">Location</span>
        <div class="value">${citySafe}</div>
      </div>

      <div class="row">
        <span class="label">Website</span>
        <div class="value">
          ${
            websiteNormalized
              ? `<a href="${escapeHtml(
                  websiteNormalized
                )}" class="link" target="_blank">${websiteTextSafe}</a>`
              : `<span class="muted">Not provided</span>`
          }
        </div>
      </div>

      <div class="section">AUDIT SCOPE</div>

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="45%">
            <span class="label">Running Ads?</span>
            <div class="value">
              ${
                payload.runningAds === "yes"
                  ? `<span class="pillYes">ACTIVE</span>`
                  : `<span class="pillNo">INACTIVE</span>`
              }
            </div>
          </td>
          <td width="55%">
            <span class="label">Service Interest</span>
            <div class="value" style="text-transform: capitalize">
              ${primaryServiceSafe}
            </div>
          </td>
        </tr>
      </table>

      <div class="footer">
        <div class="footer-text">
          Submitted from ${sourcePageSafe}
        </div>
        <div class="footer-text">
          ${timestampDhaka}
        </div>
        <div class="brandline">
          Leads.bd — a NodeWay brand
        </div>
      </div>
    </div>
  </body>
</html>`;


    // Send (Reply-To -> customer email)
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: emailSubject,
      replyTo: customerEmail || undefined, // ✅ reply যাবে customer email এ
      html: emailHtml,
    });

    if (error) {
      console.error("[audit] Resend API Error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (e: any) {
    console.error("[audit] Unexpected error:", e);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}
