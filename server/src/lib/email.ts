import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface AuditEmailData {
  name: string;
  businessName: string;
  city: string;
  whatsapp: string;
  runningAds: string;
  primaryService: string;
  sourcePage: string;
  email?: string;
  website?: string;
}

export async function sendAuditEmail(data: AuditEmailData): Promise<{ success: boolean; error?: string }> {
  const toEmail = process.env.CONTACT_TO_EMAIL || 'jakir@leads.bd';
  const fromEmail = 'Leads.bd <audit@mail.nodeway.link>';
  const subject = `New Audit Request — ${data.businessName}`;

  // Build contact section with optional fields
  let contactSection = `Name: ${data.name}
Business/Clinic: ${data.businessName}
City: ${data.city}
WhatsApp: ${data.whatsapp}`;
  if (data.email) contactSection += `\nEmail: ${data.email}`;
  if (data.website) contactSection += `\nWebsite: ${data.website}`;

  const emailBody = `
New Audit Request Received
===========================

Contact Information
-------------------
${contactSection}

Business Details
----------------
Currently Running Ads: ${data.runningAds === 'yes' ? 'Yes' : 'No'}
Primary Service: ${data.primaryService}

Source
------
Page: ${data.sourcePage}
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (Dhaka)

---
This is an automated message from Leads.bd
`.trim();

  // Reply-To: user's email if provided, otherwise admin
  const replyTo = data.email || toEmail;

  // Development mode: log and return success if no API key
  if (!resend) {
    console.log('='.repeat(50));
    console.log('DEVELOPMENT MODE - No RESEND_API_KEY configured');
    console.log('Email would be sent to:', toEmail);
    console.log('Reply-To:', replyTo);
    console.log('Subject:', subject);
    console.log('-'.repeat(50));
    console.log(emailBody);
    if (data.email) {
      console.log('-'.repeat(50));
      console.log('CONFIRMATION EMAIL would be sent to:', data.email);
    }
    console.log('='.repeat(50));
    return { success: true };
  }

  try {
    console.log('Sending admin notification via Resend...');
    console.log('From:', fromEmail);
    console.log('To:', toEmail);
    console.log('Reply-To:', replyTo);
    console.log('Subject:', subject);
    
    const { data: emailData, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo,
      subject,
      text: emailBody,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error, null, 2));
      return { success: false, error: error.message };
    }

    console.log('Admin email sent successfully:', emailData);

    // Send confirmation email to user if email provided
    if (data.email) {
      try {
        console.log('Sending confirmation email to:', data.email);
        await resend.emails.send({
          from: fromEmail,
          to: data.email,
          subject: 'We received your audit request — Leads.bd',
          text: `Hi ${data.name},\n\nThank you for requesting a free audit for ${data.businessName}.\n\nOur team will review your information and get back to you within 24-48 hours with actionable insights.\n\nBest regards,\nThe Leads.bd Team`,
        });
        console.log('Confirmation email sent to user');
      } catch (confirmErr) {
        // Log but don't fail the request if confirmation email fails
        console.error('Confirmation email failed (non-critical):', confirmErr);
      }
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown email error';
    console.error('Email send error:', message);
    return { success: false, error: message };
  }
}
