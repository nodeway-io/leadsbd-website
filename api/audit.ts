import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { Resend } from 'resend';

/**
 * Validation schema (frontend-এর সাথে match করে)
 */
const auditSchema = z.object({
  name: z.string().min(2).max(100),
  businessName: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  whatsapp: z.string().min(10).max(20),
  runningAds: z.enum(['yes', 'no']),
  primaryService: z.string().min(1),
  sourcePage: z.string().min(1),
  email: z.string().email().max(100).optional(),
  website: z.string().max(200).optional(),
});

/**
 * Email sender using Resend
 */
async function sendAuditEmail(data: any): Promise<{ success: boolean; error?: string }> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
  const FROM_EMAIL = process.env.FROM_EMAIL || 'Leads.bd <onboarding@resend.dev>';

  if (!RESEND_API_KEY || !TO_EMAIL) {
    return { success: false, error: 'Missing RESEND_API_KEY or CONTACT_TO_EMAIL' };
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Audit Request — ${data.businessName}`,
      text:
        `Name: ${data.name}\n` +
        `Business: ${data.businessName}\n` +
        `City: ${data.city}\n` +
        `WhatsApp: ${data.whatsapp}\n` +
        `Running Ads: ${data.runningAds}\n` +
        `Primary Service: ${data.primaryService}\n` +
        `Source Page: ${data.sourcePage}\n` +
        `Email: ${data.email || '(not provided)'}\n` +
        `Website: ${data.website || '(not provided)'}\n`,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Email send failed' };
  }
}

/**
 * Vercel Serverless API Handler
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // 🔒 Body safe parsing (Vercel কখনো string পাঠায়)
  let body: any;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ success: false, error: 'Invalid JSON body' });
  }

  const parsed = auditSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const emailResult = await sendAuditEmail(parsed.data);
    if (!emailResult.success) {
      return res.status(500).json({ success: false, error: emailResult.error });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
