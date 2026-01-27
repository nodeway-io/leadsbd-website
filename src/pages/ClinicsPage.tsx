import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle, XCircle, Activity, Zap, 
  Search, Layout, Phone, MessageSquare, UserCheck, Calendar, Bell,
  ShieldCheck, Database, Lock
} from 'lucide-react';

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

// Animated Number Component for Live Stats
const AnimatedNumber = ({ end, suffix = '', prefix = '' }: { end: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <span>{prefix}{count}{suffix}</span>;
};

const ClinicsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const showMobileCta = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

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
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const pipelineSteps = [
    { number: 1, title: 'Ad / Search Intent', description: 'Patient discovers your clinic online', icon: <Search className="w-full h-full" /> },
    { number: 2, title: 'Clinic Landing Page', description: 'Service-focused patient conversion page', icon: <Layout className="w-full h-full" /> },
    { number: 3, title: 'Lead Capture', description: 'Form / WhatsApp / Call booking', icon: <Phone className="w-full h-full" /> },
    { number: 4, title: 'Instant Auto-Response', description: 'Automated confirmation & clinic info', icon: <MessageSquare className="w-full h-full" /> },
    { number: 5, title: 'Patient Qualification', description: 'Intent scoring & appointment routing', icon: <UserCheck className="w-full h-full" /> },
    { number: 6, title: 'Patient Booking', description: 'Calendar integration & scheduling', icon: <Calendar className="w-full h-full" /> },
    { number: 7, title: 'CRM + Reminders', description: 'Follow-up automation & no-show reduction', icon: <Bell className="w-full h-full" /> },
  ];

  const faqItems = [
    { question: 'Can this work with WhatsApp leads?', answer: 'Yes. The patient booking system integrates with WhatsApp Business API to capture leads, send instant responses, and route conversations to booking. WhatsApp is the preferred channel for clinic inquiries in many markets.' },
    { question: 'Our staff is already busy—will this add more work?', answer: 'No. The system automates repetitive tasks: instant responses, reminders, and qualification. Staff focuses only on patients ready to book, reducing burnout.' },
    { question: 'Do we need a new website?', answer: 'Not necessarily. We typically add focused landing pages for campaigns while keeping your main site unchanged. This provides focused conversion without disrupting your existing brand.' },
    { question: 'How do you handle patient privacy?', answer: 'We follow strict data protection protocols. Patient information is processed securely, and we integrate with compliant platforms to ensure data safety.' },
    { question: 'If we already run ads, what changes?', answer: 'We fix the "leaky bucket". We improve the post-click experience with better landing pages, faster automation, and accurate tracking. Same ad spend, more booked appointments.' },
    { question: 'What does Leads.bd NOT do?', answer: 'We do not run ad campaigns or sell generic leads. We install the infrastructure—tracking, automation, and booking systems—that you own.' },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Patient Booking System Installation",
    "description": "Automated patient booking infrastructure for Dental, Cosmetic, and IVF clinics. Tracks, qualifies, and books patients automatically.",
    "provider": { "@type": "Organization", "name": "Leads.bd", "url": "https://leads.bd" },
    "serviceType": "Clinic Growth Infrastructure",
    "areaServed": "Worldwide"
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Clinic Patient Booking Systems | High-Intent Growth | Leads.bd</title>
        <meta name="description" content="Automated booking infrastructure for clinics. Turn ad clicks into qualified patient appointments. Built for Dental, Cosmetic, and IVF centers." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://leads.bd/clinics-growth" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <Header scrollToSection={scrollToSection} />

      <main className="min-h-screen bg-infrastructure">
        {/* HERO SECTION - CLINIC SPECIFIC */}
        <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-50" />
          <div className="absolute inset-0 signal-lines" />
          
          <div className="container-width relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                   <ShieldCheck className="w-4 h-4 text-emerald-500" />
                   <span className="text-xs font-medium text-emerald-400 tracking-wide uppercase">Engineered for High-Value Clinics</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                  High-Intent Patients. <br/><span className="text-gradient-green">Booked Automatically.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                  Stop chasing "leads." We install the infrastructure that filters out time-wasters and fills your calendar with pre-qualified patients ready for treatment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => scrollToSection('audit')} className="btn-hero">
                    Get a Free Clinic Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button onClick={() => scrollToSection('system')} variant="outline" className="btn-secondary">
                    See the Patient Flow
                  </Button>
                </div>
              </motion.div>

              {/* LIVE CLINIC DASHBOARD VISUAL */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <GlassCard variant="strong" className="p-6 md:p-8 relative">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Activity className="w-32 h-32 text-primary rotate-12" />
                  </div>
                  <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Clinic Performance</h3>
                      <p className="text-xs text-muted-foreground">Live Infrastructure Status</p>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 bg-emerald-500/10 rounded-lg">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-bold text-emerald-500">SYSTEM ACTIVE</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="text-xs text-muted-foreground mb-1">Qualified Bookings</p>
                      <h4 className="text-2xl font-bold text-primary"><AnimatedNumber end={128} suffix="+" /></h4>
                      <p className="text-[10px] text-emerald-400 mt-1">↑ 45% this month</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="text-xs text-muted-foreground mb-1">Response Time</p>
                      <h4 className="text-2xl font-bold text-foreground"><AnimatedNumber end={15} suffix="s" /></h4>
                      <p className="text-[10px] text-emerald-400 mt-1">Automated Instant</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">No-Show Rate Reduction</span>
                        <span className="text-xs font-bold text-primary">-<AnimatedNumber end={80} suffix="%" /></span>
                     </div>
                     <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 1.5 }} className="h-full bg-primary" />
                     </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* INTEGRATION & COMPLIANCE STRIP */}
        <section className="border-y border-white/5 bg-white/[0.02] py-6">
          <div className="container-width flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs md:text-sm text-muted-foreground font-medium">Secure & Compliant Architecture</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-80">
               {['Dentrix', 'Salesforce', 'HubSpot', 'WhatsApp API', 'Jane App'].map((tool) => (
                 <span key={tool} className="text-sm font-bold text-white/60 cursor-default">{tool}</span>
               ))}
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION - REFINED */}
        <section className="pt-24 pb-24">
          <div className="container-width">
            <SectionHeading
              title="Stop Burning Ad Budget on Ghost Leads."
              subtitle="The old way of 'Lead Generation' is broken. You don't need more leads; you need a system that filters, qualifies, and books."
            />

            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <GlassCard className="p-8 h-full border-destructive/20 bg-destructive/5 relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 text-destructive/10">
                    <XCircle className="w-40 h-40" />
                  </div>
                  <h4 className="text-xl font-bold text-destructive mb-6 flex items-center gap-3">
                    <XCircle className="h-6 w-6" />
                    The "Leaky Bucket" Clinic
                  </h4>
                  <ul className="space-y-4 relative z-10">
                    {[
                      'Front desk overwhelmed by junk calls',
                      'Leads waiting 3+ hours for a reply',
                      'No-shows killing doctor productivity',
                      'Zero visibility into which ad brings revenue',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-destructive mt-1">✕</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <GlassCard className="p-8 h-full border-primary/20 bg-primary/5 relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 text-primary/10">
                    <CheckCircle className="w-40 h-40" />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                    <CheckCircle className="h-6 w-6" />
                    The "System-First" Clinic
                  </h4>
                  <ul className="space-y-4 relative z-10">
                    {[
                      'Instant WhatsApp/SMS response (24/7)',
                      'Automated qualification before booking',
                      'Reminders that reduce no-shows by 80%',
                      'Staff only talks to patients ready to pay',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PIPELINE VISUALIZATION */}
        <section ref={sectionRefs.system} id="system" className="pt-24 pb-24 bg-white/[0.01]">
          <div className="container-width">
            <SectionHeading tag="The Architecture" title="The Clinic Booking Pipeline" />
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <SystemDiagram steps={pipelineSteps} className="flex-wrap justify-center" />
            </motion.div>
          </div>
        </section>

        {/* DATA & SIGNAL SECTION */}
        <section className="pt-20 pb-20">
          <div className="container-width">
            <SectionHeading title="Clean Data. Better Decisions." />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { title: 'GA4 + GTM Foundation', description: 'We track "Booked Appointments", not just clicks.', icon: Activity },
                { title: 'Server-Side Signal', description: 'Bypass ad blockers to feed accurate data back to Meta/Google.', icon: Database },
                { title: 'Revenue Attribution', description: 'Know exactly which ad campaign generated last month\'s revenue.', icon: Zap },
              ].map((item) => (
                <GlassCard key={item.title} variant="hover" className="p-6 text-center h-full group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 mb-4 text-primary group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES / REAL WORLD */}
        <section className="pt-24 pb-24 bg-white/[0.01]">
          <div className="container-width">
            <SectionHeading title="Deployed In The Real World" />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { type: 'Dental Clinic', challenge: 'High leads, low show-up', installed: 'WhatsApp Auto-Confirmations', outcome: '3x Show-up Rate' },
                { type: 'Cosmetic Center', challenge: 'Time wasted on priceshoppers', installed: 'Qualification Form Logic', outcome: '100% Qualified Consults' },
                { type: 'IVF / Fertility', challenge: 'Long decision cycle', installed: '6-Month Nurture Sequence', outcome: 'Automatic Reactivation' },
              ].map((example) => (
                <GlassCard key={example.type} variant="strong" className="p-8 h-full">
                  <h4 className="text-lg font-bold text-foreground mb-4">{example.type}</h4>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">Challenge</span>
                      <p className="text-sm text-muted-foreground mt-1">{example.challenge}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">Installed</span>
                      <p className="text-sm text-muted-foreground mt-1">{example.installed}</p>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Result</span>
                      <p className="text-sm text-foreground font-medium mt-1">{example.outcome}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* ENGAGEMENT TIERS */}
        <section className="pt-20 pb-20">
          <div className="container-width">
            <SectionHeading title="Infrastructure Models" subtitle="Tailored to your clinic's stage." />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { title: 'Starter System', description: 'Landing Page + Basic Booking Automation' },
                { title: 'Growth System', description: 'Advanced Tracking + Qualification + CRM Sync' },
                { title: 'Full Stack', description: 'Multi-location funnel + Call Center Integration' },
              ].map((tier) => (
                <GlassCard key={tier.title} variant="hover" className="p-8 h-full flex flex-col">
                  <h4 className="text-lg font-bold text-foreground mb-3">{tier.title}</h4>
                  <p className="text-muted-foreground flex-1 text-sm">{tier.description}</p>
                </GlassCard>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button onClick={() => scrollToSection('audit')} className="btn-primary py-6 px-8 text-lg">
                Get Your Clinic Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* AUDIT FORM */}
        <section ref={sectionRefs.audit} id="audit" className="pt-24 pb-32 bg-white/[0.01]">
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
                className="mt-12"
              >
                <AuditForm sourcePage="clinics" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pt-16 pb-20">
          <div className="container-width">
            <SectionHeading title="Common Questions" />
            <div className="max-w-3xl mx-auto mt-12">
              <FAQSection items={faqItems} />
            </div>
          </div>
        </section>

        {/* MOBILE STICKY CTA */}
        <motion.div 
          style={{ opacity: showMobileCta, y: useTransform(showMobileCta, [0, 1], [20, 0]) }}
          className="md:hidden fixed bottom-6 left-6 right-6 z-40"
        >
          <Button onClick={() => scrollToSection('audit')} className="w-full btn-hero shadow-2xl border border-white/10">
            Get Free Audit
          </Button>
        </motion.div>

      </main>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </PageTransition>
  );
};

export default ClinicsPage;