import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { sendAuditEmail } from '../lib/email.js';

export const auditRouter = Router();

// Validation schema matching frontend
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

auditRouter.post('/audit', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const result = auditSchema.safeParse(req.body);
    
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors,
      });
    }

    const data = result.data;

    // Log optional fields for audit/debug
    if (data.email || data.website) {
      console.log('Audit request extras:', { email: data.email || '-', website: data.website || '-' });
    }

    // Send email
    const emailResult = await sendAuditEmail(data);

    if (!emailResult.success) {
      console.error('Email send failed:', emailResult.error);
      const isDev = process.env.NODE_ENV !== 'production';
      return res.status(500).json({
        success: false,
        error: isDev ? emailResult.error : 'Failed to process request. Please try again.',
      });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Audit endpoint error:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});
