import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import GlassCard from './GlassCard';
import { useToast } from '@/hooks/use-toast';
import { getApiUrl } from '@/lib/api';

export const auditFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  businessName: z.string().min(2, 'Business name must be at least 2 characters').max(100),
  city: z.string().min(2, 'City must be at least 2 characters').max(100),
  whatsapp: z.string().min(10, 'Please enter a valid WhatsApp number').max(20),
  runningAds: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  primaryService: z.string().min(1, 'Please select a service'),
  email: z.string().email('Please enter a valid email').max(100).optional().or(z.literal('')),
  website: z.string().max(200).optional(),
});

export type AuditFormData = z.infer<typeof auditFormSchema>;

interface AuditFormProps {
  sourcePage: 'homepage' | 'clinics';
}

export const AuditForm: React.FC<AuditFormProps> = ({ sourcePage }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
  });

  const serviceOptions = sourcePage === 'clinics' 
    ? [
        { value: 'dental', label: 'Dental Clinic' },
        { value: 'cosmetic', label: 'Cosmetic / Aesthetic Clinic' },
        { value: 'hair', label: 'Hair Transplant' },
        { value: 'ivf', label: 'Fertility / IVF' },
        { value: 'diagnostic', label: 'Diagnostic Center' },
        { value: 'other-clinic', label: 'Other Clinic' },
      ]
    : [
        { value: 'clinic', label: 'Clinic / Medical' },
        { value: 'immigration', label: 'Immigration Services' },
        { value: 'professional', label: 'Professional Services' },
        { value: 'local-service', label: 'High-Ticket Local Service' },
        { value: 'other', label: 'Other' },
      ];

  const onSubmit = async (data: AuditFormData) => {
    setIsSubmitting(true);
    
    try {
      // Build payload, include optional fields only if provided
      const payload: Record<string, string> = {
        name: data.name,
        businessName: data.businessName,
        city: data.city,
        whatsapp: data.whatsapp,
        runningAds: data.runningAds,
        primaryService: data.primaryService,
        sourcePage,
      };
      if (data.email?.trim()) payload.email = data.email.trim();
      if (data.website?.trim()) payload.website = data.website.trim();

      const response = await fetch(getApiUrl('/api/audit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        console.error('Audit form: Failed to parse response', response.status);
        throw new Error('Server unavailable');
      }

      if (!response.ok || !result.success) {
        console.error('Audit form error:', response.status, result.error);
        throw new Error(response.status === 429 ? 'rate_limit' : (result.error || 'Submission failed'));
      }
      
      // Fire Meta Pixel Lead event on successful submission
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }

      setIsSuccess(true);
      toast({
        title: "Audit Request Submitted!",
        description: "We'll review your information and get back to you within 24-48 hours.",
      });
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      const isRateLimit = message === 'rate_limit';
      toast({
        title: isRateLimit ? "Too Many Requests" : "Submission Failed",
        description: isRateLimit 
          ? "Please wait a few minutes before trying again."
          : "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <GlassCard variant="strong" className="p-8 md:p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
          Audit Request Received!
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We'll analyze your current acquisition setup and get back to you within 24-48 hours with actionable insights.
        </p>
        <Button 
          onClick={() => setIsSuccess(false)} 
          variant="outline"
          className="btn-secondary"
        >
          Submit Another Request
        </Button>
      </GlassCard>
    );
  }

  return (
    <GlassCard variant="strong" className="p-6 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Your Name
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="John Doe"
              className="bg-white/5 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-sm font-medium text-foreground">
              Business / Clinic Name
            </Label>
            <Input
              id="businessName"
              {...register('businessName')}
              placeholder="ABC Clinic"
              className="bg-white/5 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
            />
            {errors.businessName && (
              <p className="text-xs text-destructive">{errors.businessName.message}</p>
            )}
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium text-foreground">
              City
            </Label>
            <Input
              id="city"
              {...register('city')}
              placeholder="Dhaka"
              className="bg-white/5 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
            />
            {errors.city && (
              <p className="text-xs text-destructive">{errors.city.message}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
              WhatsApp Number
            </Label>
            <Input
              id="whatsapp"
              {...register('whatsapp')}
              placeholder="+880 1XXX XXXXXX"
              className="bg-white/5 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
            />
            {errors.whatsapp && (
              <p className="text-xs text-destructive">{errors.whatsapp.message}</p>
            )}
          </div>

          {/* Running Ads */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Currently Running Ads?
            </Label>
            <Select onValueChange={(value) => setValue('runningAds', value as 'yes' | 'no')}>
              <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary/50 text-foreground">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="yes">Yes, running ads</SelectItem>
                <SelectItem value="no">No, not yet</SelectItem>
              </SelectContent>
            </Select>
            {errors.runningAds && (
              <p className="text-xs text-destructive">{errors.runningAds.message}</p>
            )}
          </div>

          {/* Primary Service */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Primary Service
            </Label>
            <Select onValueChange={(value) => setValue('primaryService', value)}>
              <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary/50 text-foreground">
                <SelectValue placeholder="Select service..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                {serviceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.primaryService && (
              <p className="text-xs text-destructive">{errors.primaryService.message}</p>
            )}
          </div>

          {/* Work Email (optional) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Work Email <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="you@company.com"
              className="bg-white/5 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Website URL (optional) */}
          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-medium text-foreground">
              Website / Page URL <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="website"
              {...register('website')}
              placeholder="https://yoursite.com"
              className="bg-white/5 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
            />
            {errors.website && (
              <p className="text-xs text-destructive">{errors.website.message}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-hero mt-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            'Request Audit'
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center pt-2">
          By submitting this form, you agree to our{' '}
          <Link 
            to="/privacy" 
            className="text-primary hover:underline"
            onClick={() => window.scrollTo(0, 0)}
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </GlassCard>
  );
};

export default AuditForm;
