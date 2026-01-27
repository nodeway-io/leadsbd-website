const FROM_EMAIL = 'Leads.bd Audit <audit@mail.nodeway.link>';
const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY || !TO_EMAIL) {
  console.error('Missing env vars', {
    has_RESEND_API_KEY: !!RESEND_API_KEY,
    has_CONTACT_TO_EMAIL: !!TO_EMAIL,
  });
  return res.status(500).json({ success: false, error: 'Missing RESEND_API_KEY or CONTACT_TO_EMAIL' });
}

// --------------------
// Helpers (security + data quality)
// --------------------
const escapeHtml = (input: unknown) => {
  const s = String(input ?? '');
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const isValidEmail = (email: string) => {
  // simple, reliable enough for headers
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const normalizeUrl = (raw: unknown) => {
  const s = String(raw ?? '').trim();
  if (!s) return null;

  const withProto = /^https?:\/\//i.test(s) ? s : `https://${s}`;

  try {
    const u = new URL(withProto);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return u.toString();
  } catch {
    return null;
  }
};

const normalizeWhatsapp = (raw: unknown) => {
  // Returns digits only (no +) for wa.me
  const s = String(raw ?? '').trim();
  if (!s) return null;

  let digits = s.replace(/[^\d]/g, ''); // digits only

  // If BD local format like 01XXXXXXXXX (11 digits) => convert to 8801XXXXXXXXX
  if (digits.length === 11 && digits.startsWith('01')) {
    digits = `88${digits}`; // 88 + 01... => 8801...
  }

  // If starts with 00 (international) => drop leading 00
  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  // Basic sanity: wa.me typically needs countrycode + number, usually 10-15 digits
  if (digits.length < 10 || digits.length > 15) return null;

  return digits;
};

// --------------------
// Subject line (same style)
// --------------------
const businessNameSafe = escapeHtml(payload.businessName);
const citySafe = escapeHtml(payload.city);
const emailSubject = `Audit Request: ${payload.businessName}`;

// sanitize values for display
const nameSafe = escapeHtml(payload.name);
const whatsappRawSafe = escapeHtml(payload.whatsapp);
const primaryServiceSafe = escapeHtml(payload.primaryService);
const sourcePageSafe = escapeHtml(payload.sourcePage);

// email + website (validated)
const emailRaw = String(payload.email ?? '').trim();
const customerEmail = emailRaw && isValidEmail(emailRaw) ? emailRaw : '';
const customerEmailSafe = escapeHtml(customerEmail);

const websiteNormalized = normalizeUrl(payload.website);
const websiteTextSafe = escapeHtml(String(payload.website ?? '').trim());

// whatsapp wa.me
const waDigits = normalizeWhatsapp(payload.whatsapp);
const waLink = waDigits ? `https://wa.me/${waDigits}` : '';

// --------------------
// Email HTML (layout preserved, only styling + links improved)
// --------------------
const emailHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(emailSubject)}</title>
    <style>
      body { margin:0; padding:0; background:#ffffff; color:#1a1a1a; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
      .container { max-width:600px; margin:0 auto; padding:40px 20px; }

      /* Brand Header */
      .logo { font-size:22px; font-weight:700; color:#111827; letter-spacing:-0.5px; text-decoration:none; }
      .dot { color:#00C896; }

      .divider { border-top:1px solid #f0f0f0; margin:30px 0; }

      /* Typography */
      .h1 { font-size:18px; font-weight:600; margin:0 0 6px 0; letter-spacing:-0.2px; color:#111827; }
      .sub { font-size:13px; color:#6b7280; margin:0; font-weight:400; }

      /* Sections */
      .section { font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#9ca3af; font-weight:600; margin:32px 0 12px 0; }
      .row { margin-bottom:16px; }
      .label { font-size:12px; color:#6b7280; margin-bottom:4px; display:block; }
      .value { font-size:15px; color:#111827; font-weight:500; line-height:1.5; }

      /* Elements */
      .muted { color:#a1a1a1; font-style:italic; }

      /* Brand-soft links (NO BLUE) */
      .link { color:#00C896; text-decoration:none; border-bottom:1px solid #c7f3e7; transition: border-color 0.2s; }
      .link:hover { border-color:#00C896; }

      /* Status Pills (Minimalist) */
      .pillYes { background:#e6fffa; color:#00a37e; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:700; letter-spacing:0.5px; display:inline-block; }
      .pillNo { background:#f4f4f5; color:#6b7280; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:700; letter-spacing:0.5px; display:inline-block; }

      /* Corporate Footer */
      .footer { margin-top:50px; padding-top:20px; border-top:1px solid #fafafa; }
      .footer-text { font-size:11px; color:#9ca3af; line-height:1.6; }
      .brand-connection { margin-top:8px; font-size:11px; color:#9ca3af; }
      .brand-connection strong { color:#374151; font-weight:600; }
    </style>
  </head>
  <body>
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
      New lead: ${businessNameSafe} (${citySafe}).
    </div>

    <div class="container">
      <div style="margin-bottom:30px;">
        <span class="logo">leads<span class="dot">.</span></span>
      </div>

      <h1 class="h1">New Audit Request</h1>
      <p class="sub">Source: Landing Page Form</p>

      <div class="divider"></div>

      <div class="section">Contact Details</div>

      <div class="row">
        <span class="label">Name</span>
        <div class="value">${nameSafe}</div>
      </div>

      <div class="row">
        <span class="label">Email Address</span>
        <div class="value">
          ${
            customerEmail
              ? `<a href="mailto:${customerEmailSafe}" class="link">${customerEmailSafe}</a>`
              : `<span class="muted">Not provided</span>`
          }
        </div>
      </div>

      <div class="row">
        <span class="label">WhatsApp / Phone</span>
        <div class="value">
          ${
            waLink
              ? `<a href="${waLink}" class="link" target="_blank" rel="noopener noreferrer">${whatsappRawSafe}</a>`
              : `${whatsappRawSafe || `<span class="muted">Not provided</span>`}`
          }
        </div>
      </div>

      <div class="section">Business Profile</div>

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
              ? `<a href="${escapeHtml(websiteNormalized)}" class="link" target="_blank" rel="noopener noreferrer">${websiteTextSafe || escapeHtml(websiteNormalized)}</a>`
              : `<span class="muted">Not provided</span>`
          }
        </div>
      </div>

      <div class="section">Audit Scope</div>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
        <tr>
          <td width="45%" valign="top">
            <span class="label">Running Ads?</span>
            <div class="value" style="margin-top:4px;">
              ${
                payload.runningAds === 'yes'
                  ? `<span class="pillYes">ACTIVE</span>`
                  : `<span class="pillNo">INACTIVE</span>`
              }
            </div>
          </td>
          <td width="55%" valign="top">
            <span class="label">Service Interest</span>
            <div class="value" style="text-transform:capitalize;">${primaryServiceSafe}</div>
          </td>
        </tr>
      </table>

      <div class="footer">
        <div class="footer-text">
          Submitted via <strong>${sourcePageSafe}</strong> &nbsp;•&nbsp;
          ${escapeHtml(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }))}
        </div>

        <div class="brand-connection">
          <span style="display:inline-block; margin-top:8px; padding-top:8px; border-top:1px dashed #eee;">
            <strong>Leads.bd</strong> is built on <strong>NodeWay</strong> infrastructure. <br/>
            Designed for reliable delivery, secure handling, and fast response.
          </span>
        </div>
      </div>
    </div>
  </body>
</html>
`;

// --------------------
// Send (Reply-To -> customer email) ✅
// --------------------
const { data, error } = await resend.emails.send({
  from: FROM_EMAIL,
  to: [TO_EMAIL],
  subject: emailSubject,
  reply_to: customerEmail || undefined,
  html: emailHtml,
});

if (error) {
  console.error('Resend API Error:', error);
  return res.status(500).json({ success: false, error: error.message });
}

console.log('Email sent:', data?.id);
return res.status(200).json({ success: true, id: data?.id });
