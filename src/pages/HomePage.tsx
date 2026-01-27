import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Zap, BarChart3, Target, Clock, CheckCircle, 
  AlertTriangle, Search, UserCheck, Calendar, GitMerge, ChevronRight 
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
import { useScrollSpyObserver } from '@/contexts/ScrollSpyContext';

// Animated Number Component for Hero
const AnimatedNumber = ({ end, suffix = '' }: { end: number, suffix?: string }) => {
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
  return <span>{count}{suffix}</span>;
};

const HomePage: React.FC = () => {
  useScrollSpyObserver(['system', 'industries', 'proof', 'faq', 'audit']);
  const location = useLocation() as any;
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const showMobileCta = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    const scrollToHash = () => {
      const stateTarget = location?.state?.scrollTo;
      const hashTarget = window.location.hash.replace('#', '');
      const targetId = stateTarget || hashTarget;
      if (!targetId) return;
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    };
    scrollToHash();
  }, [location]);

  const sectionRefs = {
    system: useRef<HTMLElement>(null),
    industries: useRef<HTMLElement>(null),
    proof: useRef<HTMLElement>(null),
    faq: useRef<HTMLElement>(null),
    audit: useRef<HTMLElement>(null),
  };

  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Systems Steps
  const systemSteps = [
    { number: 1, title: 'Demand Capture', description: 'Clinic ads + landing pages + offer framing', icon: <Search className="w-full h-full" /> },
    { number: 2, title: 'Signal & Measurement', description: 'Server-side tracking, conversion validation', icon: <BarChart3 className="w-full h-full" /> },
    { number: 3, title: 'Lead Qualification', description: 'Intent filters + patient routing rules', icon: <UserCheck className="w-full h-full" /> },
    { number: 4, title: 'Automation Layer', description: 'Instant follow-up, reminders, booking triggers', icon: <Zap className="w-full h-full" /> },
    { number: 5, title: 'Patient Booking', description: 'Calendar integration + CRM handoff', icon: <Calendar className="w-full h-full" /> },
  ];

  // FAQ Items
  const faqItems = [
    { question: 'What do you deliver in the audit?', answer: 'The audit analyzes your current patient acquisition setup including ads, landing pages, follow-up process, and tracking. You receive a report identifying where leads are leaking and specific recommendations to improve conversion.' },
    { question: 'Do you run ads or only build systems?', answer: 'Leads.bd builds customer acquisition infrastructure, not ad campaigns. We install tracking, landing pages, automation, and patient booking systems. We do not sell ad packages or manage media buying.' },
    { question: 'Do I need a new website?', answer: 'Not always. We typically add focused landing pages for campaigns while keeping your existing site unchanged. Our clinic marketing consultants recommend the minimum viable changes to improve patient booking conversion.' },
    { question: 'What tools do you integrate with?', answer: 'We integrate with GA4, GTM, Meta CAPI, CRMs like HubSpot and Zoho, WhatsApp Business API, and calendar booking tools. The system adapts to your existing marketing stack.' },
    { question: 'How fast can this be installed?', answer: 'A starter patient booking system can be deployed in 2-3 weeks. More complex systems with custom CRM integrations take 4-6 weeks. Timeline is confirmed during the initial audit.' },
    { question: 'What if we already run ads?', answer: 'Existing ad traffic is ideal. We optimize the post-click experience: better landing pages, faster follow-up automation, and proper conversion tracking. Same ad spend, more booked appointments.' },
    { question: 'What does Leads.bd NOT do?', answer: 'Leads.bd does not sell ad packages, templates, or run media buying campaigns. We install customer acquisition infrastructure—tracking, automation, landing pages, and patient booking systems—tailored to your business.' },
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

  return (
    <PageTransition>
      <Helmet>
        <title>Patient Booking System & Growth Infrastructure | Leads.bd</title>
        <meta name="description" content="We build customer acquisition infrastructure for clinics. Automated patient booking systems that turn ad spend into revenue. Not an agency." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://leads.bd/" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header scrollToSection={scrollToSection} />

      <main className="min-h-screen bg-infrastructure">
        {/* HERO SECTION - ELITE UPGRADE */}
        <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-50" />
          <div className="absolute inset-0 signal-lines" />
          
          <div className="container-width relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-xs font-medium text-primary tracking-wide">SYSTEM ARCHITECTS FOR CLINICS</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                  Turn Ad Spend Into Booked Customers — <span className="text-gradient-green">Automatically.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                  We don't just run ads. We install the <strong>Growth Infrastructure</strong> that tracks, qualifies, and books patients into your calendar 24/7.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => scrollToSection('audit')} className="btn-hero">
                    Get a Free Acquisition Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button onClick={() => scrollToSection('system')} variant="outline" className="btn-secondary">
                    See the System Logic
                  </Button>
                </div>
              </motion.div>

              {/* LIVE INFRASTRUCTURE SNAPSHOT */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <GlassCard variant="strong" className="p-6 md:p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Zap className="w-24 h-24 text-primary rotate-12" />
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Infrastructure Status</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400 font-mono">● LIVE</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <BarChart3 className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground text-sm">Signal Accuracy</span>
                        </div>
                        <span className="text-primary font-bold font-mono"><AnimatedNumber end={99.8} suffix="%" /></span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '99.8%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-primary" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <Zap className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground text-sm">Response Time</span>
                        </div>
                        <span className="text-primary font-bold font-mono text-xs"><AnimatedNumber end={30} suffix="s" /></span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} animate={{ width: '95%' }} transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }} className="h-full bg-primary" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <Target className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground text-sm">Booking Pipeline</span>
                        </div>
                        <span className="text-emerald-400 text-xs font-mono">Active</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Qualification → Routing → Calendar Handoff</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST / SOCIAL PROOF STRIP */}
        <section className="border-y border-white/5 bg-white/[0.02] py-8 overflow-hidden">
          <div className="container-width flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Trusted Infrastructure For:</span>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60 grayscale">
              {['Dental Clinics', 'Cosmetic Centers', 'IVF Labs', 'Law Firms', 'Visa Consultants'].map((niche) => (
                <span key={niche} className="text-lg font-bold text-white/40 hover:text-white/80 transition-colors cursor-default">
                  {niche}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION - LEAK MAP */}
        <section className="pt-24 pb-24">
          <div className="container-width">
            <SectionHeading
              title="Most Businesses Don't Lose Customers. They Leak Them."
              subtitle="The gap between an 'Ad Click' and a 'Booking' is where 60% of your budget disappears."
            />
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="mt-16">
              <GlassCard className="p-8 md:p-12 relative">
                 {/* Visual Flow with Arrows */}
                <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
                  {['Traffic', 'Lead', 'Follow-up', 'Booking', 'Revenue'].map((step, index) => (
                    <React.Fragment key={step}>
                      <span className={`px-5 py-3 rounded-lg border font-medium ${index === 2 || index === 3 ? 'bg-destructive/10 border-destructive/30 text-destructive' : 'bg-white/5 border-white/10 text-foreground'}`}>
                        {step}
                      </span>
                      {index < 4 && <ArrowRight className="text-muted-foreground opacity-30" />}
                    </React.Fragment>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {[
                    { t: 'Untracked Conversions', d: 'Pixel blind spots losing data.' },
                    { t: 'Slow Follow-up', d: 'Leads go cold in 5 minutes.' },
                    { t: 'No Qualification', d: 'Staff chasing junk leads.' },
                    { t: 'Broken Booking', d: 'No automated calendar sync.' },
                  ].map((leak) => (
                    <div key={leak.t} className="flex items-start gap-3 p-4 bg-destructive/5 rounded-xl border border-destructive/10">
                      <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{leak.t}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{leak.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* SYSTEM SECTION */}
        <section ref={sectionRefs.system} id="system" className="pt-24 pb-24 bg-white/[0.01]">
          <div className="container-width">
            <SectionHeading tag="The Architecture" title="A Complete Acquisition System. Not Campaigns." subtitle="We install a predictable machine that runs 24/7." />
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
              <SystemDiagram steps={systemSteps} />
            </motion.div>

            {/* Feature Cards with Micro-Interactions */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {[
                { title: 'Signal Quality', desc: 'Server-side tracking & clean data attribution.', icon: BarChart3 },
                { title: 'Conversion Logic', desc: 'Landing page → Nurture → Calendar.', icon: GitMerge },
                { title: 'Automation Core', desc: 'Instant WhatsApp/SMS & Routing.', icon: Zap },
              ].map((item) => (
                <GlassCard key={item.title} variant="hover" className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY SECTION (HUMAN TOUCH) */}
        <section className="pt-20 pb-20 border-y border-white/5 bg-white/[0.02]">
          <div className="container-width">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeading tag="The Philosophy" title="Stop Renting Traffic. Own the System." centered={false} />
                <div className="prose prose-invert mt-6 text-muted-foreground">
                  <p>Most agencies focus on "Cost Per Lead". We focus on <strong>"Cost Per Booked Appointment"</strong>.</p>
                  <p>When you hire an agency, you rent their time. When you work with Leads.bd, you <strong>own the infrastructure</strong>. We build the tracking, the automation, and the booking flow inside <em>your</em> business.</p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-primary">N</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">NodeWay Engineering Team</p>
                    <p className="text-xs text-muted-foreground">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
              <GlassCard className="p-8 md:p-10 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <h4 className="text-lg font-semibold text-primary mb-4">The "System First" Promise</h4>
                <ul className="space-y-4">
                  {[
                    'We never touch ad spend until tracking is 100%.',
                    'We build assets you keep forever.',
                    'We automate the "boring" follow-up work.',
                    'We optimize for Revenue, not just Clicks.'
                  ].map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground/80">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* ENGAGEMENT MODELS */}
        <section className="pt-24 pb-24">
          <div className="container-width">
            <SectionHeading title="Engagement Models" subtitle="Built around your scale." />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { title: 'Starter Infrastructure', desc: 'Core funnel + Booking + Basic Automation' },
                { title: 'Growth Infrastructure', desc: 'Advanced Tracking + Qualification + CRM' },
                { title: 'Full Acquisition Stack', desc: 'Custom System + Optimization + Reporting' },
              ].map((tier) => (
                <GlassCard key={tier.title} variant="hover" className="p-8 flex flex-col h-full">
                  <h4 className="text-lg font-bold text-foreground mb-3">{tier.title}</h4>
                  <p className="text-sm text-muted-foreground flex-1 mb-6">{tier.desc}</p>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary/50 w-1/3"></div>
                  </div>
                </GlassCard>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button onClick={() => scrollToSection('audit')} className="btn-primary">
                Get Your Audit & Pricing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* PROOF / REAL BUSINESSES */}
        <section ref={sectionRefs.proof} id="proof" className="pt-24 pb-24 bg-white/[0.01]">
          <div className="container-width">
             <SectionHeading title="Deployed In The Real World" />
             <div className="grid md:grid-cols-2 gap-8 mt-12">
               <GlassCard variant="strong" className="p-8">
                 <div className="flex justify-between items-start mb-6">
                   <h4 className="text-xl font-bold text-foreground">Dental Clinic</h4>
                   <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">SCALING</span>
                 </div>
                 <div className="space-y-4 text-sm">
                   <div className="flex justify-between border-b border-white/5 pb-2">
                     <span className="text-muted-foreground">Problem</span>
                     <span className="text-foreground text-right">High leads, zero bookings</span>
                   </div>
                   <div className="flex justify-between border-b border-white/5 pb-2">
                     <span className="text-muted-foreground">Install</span>
                     <span className="text-foreground text-right">WhatsApp Automation + Calendar</span>
                   </div>
                   <div className="flex justify-between pt-2">
                     <span className="text-muted-foreground">Result</span>
                     <span className="text-primary font-bold text-right">3x Show-up Rate</span>
                   </div>
                 </div>
               </GlassCard>

               <GlassCard variant="strong" className="p-8">
                 <div className="flex justify-between items-start mb-6">
                   <h4 className="text-xl font-bold text-foreground">Cosmetic Center</h4>
                   <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">OPTIMIZED</span>
                 </div>
                 <div className="space-y-4 text-sm">
                   <div className="flex justify-between border-b border-white/5 pb-2">
                     <span className="text-muted-foreground">Problem</span>
                     <span className="text-foreground text-right">Junk inquiries wasting time</span>
                   </div>
                   <div className="flex justify-between border-b border-white/5 pb-2">
                     <span className="text-muted-foreground">Install</span>
                     <span className="text-foreground text-right">Qualification Logic + Filtering</span>
                   </div>
                   <div className="flex justify-between pt-2">
                     <span className="text-muted-foreground">Result</span>
                     <span className="text-primary font-bold text-right">100% Qualified Bookings</span>
                   </div>
                 </div>
               </GlassCard>
             </div>
          </div>
        </section>

        {/* AUDIT SECTION */}
        <section ref={sectionRefs.audit} id="audit" className="pt-24 pb-32">
          <div className="container-width max-w-2xl text-center">
            <SectionHeading title="Stop Leaking Customers." subtitle="Let us audit your current path and show you exactly what infrastructure you're missing." />
            <div className="mt-12 text-left">
              <AuditForm sourcePage="homepage" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={sectionRefs.faq} id="faq" className="pt-20 pb-20 bg-white/[0.01]">
          <div className="container-width">
            <SectionHeading title="Common Questions" />
            <div className="mt-12 max-w-3xl mx-auto">
              <FAQSection items={faqItems} />
            </div>
          </div>
        </section>

        {/* MOBILE STICKY CTA (US Standard Accessibility) */}
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

export default HomePage;