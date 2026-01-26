import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, XCircle, Activity, Shield, Zap, Clock, Users, Database } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import SectionHeading from '@/components/SectionHeading';
import SystemDiagram from '@/components/SystemDiagram';
import AuditForm from '@/components/AuditForm';
import FAQSection from '@/components/FAQSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';

const ClinicsPage: React.FC = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionRefs = {
    system: useRef<HTMLElement>(null),
    audit: useRef<HTMLElement>(null),
  };

  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const pipelineSteps = [
    { number: 1, title: 'Ad / Search Intent', description: 'Patient discovers your clinic online' },
    { number: 2, title: 'Clinic Landing Page', description: 'Service-focused patient conversion page' },
    { number: 3, title: 'Lead Capture', description: 'Form / WhatsApp / Call booking' },
    { number: 4, title: 'Instant Auto-Response', description: 'Automated confirmation & clinic info' },
    { number: 5, title: 'Patient Qualification', description: 'Intent scoring & appointment routing' },
    { number: 6, title: 'Patient Booking', description: 'Calendar integration & scheduling' },
    { number: 7, title: 'CRM + Reminders', description: 'Follow-up automation & no-show reduction' },
  ];

  const faqItems = [
    {
      question: 'Can this work with WhatsApp leads?',
      answer: 'Yes. The patient booking system integrates with WhatsApp Business API to capture leads, send instant responses, and route conversations to booking. WhatsApp is the preferred channel for clinic inquiries in many markets.',
    },
    {
      question: 'Our staff is already busy—will this add more work?',
      answer: 'No. The patient booking automation handles repetitive tasks: instant responses, appointment reminders, and lead qualification. Clinic staff focuses on patients ready to book, not chasing unqualified inquiries.',
    },
    {
      question: 'Do we need a new website?',
      answer: 'Not necessarily. Our clinic marketing consultants create dedicated landing pages for patient acquisition campaigns while your main website stays unchanged. This provides focused conversion without disrupting your existing presence.',
    },
    {
      question: 'If we already run ads, what changes?',
      answer: 'We improve the patient journey after the ad click. Better clinic landing pages, faster follow-up automation, and proper conversion tracking. Same ad budget, more patients showing up for appointments.',
    },
    {
      question: 'How do you handle patient privacy?',
      answer: 'We follow healthcare data protection best practices. Patient information is stored only where necessary for the booking system and never shared with third parties. We work within your specific compliance requirements.',
    },
    {
      question: 'What does Leads.bd NOT do for clinics?',
      answer: 'Leads.bd does not run ad campaigns or sell marketing templates. We install patient booking systems and customer acquisition infrastructure—tracking, automation, and landing pages—tailored to your clinic.',
    },
  ];

  // Generate FAQPage JSON-LD from faqItems
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // Service schema for clinic marketing services
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Patient Booking System Installation",
    "description": "Clinic marketing consultant services that install patient acquisition infrastructure including landing pages, booking automation, and conversion tracking for dental, cosmetic, IVF, and diagnostic clinics.",
    "provider": {
      "@type": "Organization",
      "name": "Leads.bd",
      "url": "https://leads.bd"
    },
    "serviceType": "Clinic Marketing Consultant",
    "areaServed": "Worldwide"
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Clinic Marketing Consultant | Patient Booking System | Leads.bd</title>
        <meta 
          name="description" 
          content="Clinic marketing consultant building patient booking systems for dental, cosmetic, IVF clinics. Convert ad clicks into scheduled appointments." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://leads.bd/clinics-growth" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>

      <Header scrollToSection={scrollToSection} />

      <main className="min-h-screen bg-infrastructure">
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-50" />
          <div className="absolute inset-0 signal-lines" />
          
          <div className="container-width relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6">
                More Booked Patients. <span className="text-gradient-green">Built as a System.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
                Leads.bd is a clinic marketing consultant that installs patient acquisition infrastructure—turning ad clicks into scheduled appointments through automated patient booking systems.
              </p>
              <p className="text-sm text-primary/80 mb-8 font-medium">
                Dental • Cosmetic • Hair Transplant • Fertility/IVF • Diagnostic Centers
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => scrollToSection('audit')}
                  className="btn-hero"
                >
                  Get a Free Clinic Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('system')}
                  variant="outline"
                  className="btn-secondary"
                >
                  See the Clinic System
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Clinic Reality Section */}
        <section className="pt-20 pb-20">
          <div className="container-width">
            <SectionHeading
              title="Clinics Lose Patients Between Interest and Booking."
            />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              className="grid md:grid-cols-2 gap-6 mt-12"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                }}
              >
                <GlassCard className="p-6 md:p-8 h-full border-destructive/30">
                  <h4 className="text-lg font-semibold text-destructive mb-6 flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    Manual Clinic Workflow
                  </h4>
                  <ul className="space-y-4">
                    {[
                      'Missed calls during busy hours',
                      'Slow or no reply to inquiries',
                      'No automated reminders',
                      'Staff overwhelmed with follow-ups',
                      'No visibility into lead source',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted-foreground">
                        <XCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                }}
              >
                <GlassCard className="p-6 md:p-8 h-full border-primary/30">
                  <h4 className="text-lg font-semibold text-primary mb-6 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    System-Based Workflow
                  </h4>
                  <ul className="space-y-4">
                    {[
                      'Instant auto-response 24/7',
                      'Qualification before handoff',
                      'Automated booking + reminders',
                      'Staff focuses on ready patients',
                      'Clear attribution for every booking',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Clinic Booking Pipeline */}
        <section ref={sectionRefs.system} id="system" className="pt-24 pb-24 bg-white/[0.01]">
          <div className="container-width">
            <SectionHeading
              tag="The Pipeline"
              title="The Clinic Booking Pipeline"
            />

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 md:mt-16"
            >
              <SystemDiagram steps={pipelineSteps} />
            </motion.div>
          </div>
        </section>

        {/* Tracking & Signal */}
        <section className="pt-20 pb-20">
          <div className="container-width">
            <SectionHeading
              title="Clean Data. Better Decisions."
            />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              {[
                { title: 'GA4 + GTM Foundation', description: 'Proper clinic conversion tracking from the start', icon: Activity },
                { title: 'Meta CAPI Integration', description: 'Reliable signals for medical ad optimization', icon: Zap },
                { title: 'Patient Booking Validation', description: 'Track actual appointments, not just leads', icon: CheckCircle },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
                  }}
                >
                  <GlassCard variant="hover" className="p-6 text-center h-full">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 mb-4"
                    >
                      <item.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Signal Quality Meter */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <GlassCard className="p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">Signal Quality</span>
                  <span className="text-sm text-primary">Validated</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '80%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full" 
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Server-side tracking + event validation
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* System Install Examples - Clinics */}
        <section className="pt-20 pb-20 bg-white/[0.01]">
          <div className="container-width">
            <SectionHeading
              title="How the System Works in Real Clinics"
            />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              {[
                {
                  type: 'Dental Clinic',
                  challenge: 'Inconsistent booking from Facebook leads',
                  installed: 'Landing page + instant WhatsApp + booking flow',
                  outcome: 'Higher show-up rate, cleaner calendar',
                },
                {
                  type: 'Cosmetic / Hair Transplant',
                  challenge: 'Too many unqualified consultations',
                  installed: 'Qualification form + automated nurture + handoff',
                  outcome: 'Better patient quality, less wasted time',
                },
                {
                  type: 'Diagnostic / IVF Center',
                  challenge: 'Complex services, long decision cycle',
                  installed: 'Multi-step funnel + reminder sequences + CRM',
                  outcome: 'Clearer pipeline, better follow-through',
                },
              ].map((example) => (
                <motion.div
                  key={example.type}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <GlassCard variant="strong" className="p-6 md:p-8 h-full">
                    <h4 className="text-lg font-semibold text-foreground mb-4">{example.type}</h4>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Challenge</span>
                        <p className="text-sm text-muted-foreground mt-1">{example.challenge}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Installed</span>
                        <p className="text-sm text-muted-foreground mt-1">{example.installed}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Outcome</span>
                        <p className="text-sm text-muted-foreground mt-1">{example.outcome}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Engagement Model */}
        <section className="pt-20 pb-20">
          <div className="container-width">
            <SectionHeading
              title="Simple Engagement. Built for Clinics."
              subtitle="We don't sell templates. We install infrastructure tailored to your clinic."
            />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              {[
                { title: 'Starter Infrastructure', description: 'Core landing + booking + basic automation' },
                { title: 'Growth Infrastructure', description: 'Advanced tracking + qualification + CRM workflows' },
                { title: 'Full Acquisition Stack', description: 'Multi-service funnels + optimization + reporting' },
              ].map((tier) => (
                <motion.div
                  key={tier.title}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <GlassCard variant="hover" className="p-6 md:p-8 h-full flex flex-col">
                    <h4 className="text-lg font-semibold text-foreground mb-3">{tier.title}</h4>
                    <p className="text-muted-foreground flex-1">{tier.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center mt-8"
            >
              <Button onClick={() => scrollToSection('audit')} className="btn-primary py-3.5">
                Get a Free Clinic Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Clinic Audit Form */}
        <section ref={sectionRefs.audit} id="audit" className="pt-24 pb-24 bg-white/[0.01]">
          <div className="container-width">
            <div className="max-w-2xl mx-auto">
              <SectionHeading
                title="Get Your Clinic Acquisition Audit"
                subtitle="We'll analyze your patient acquisition flow and show you exactly where bookings are leaking."
              />

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10"
              >
                <AuditForm sourcePage="clinics" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pt-16 pb-16">
          <div className="container-width">
            <SectionHeading title="Frequently Asked Questions" />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto mt-12"
            >
              <FAQSection items={faqItems} />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </PageTransition>
  );
};

export default ClinicsPage;
