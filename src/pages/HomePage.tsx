import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Zap, BarChart3, Target, Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
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

const HomePage: React.FC = () => {
  // Set up scroll spy observer for nav sections
  useScrollSpyObserver(['system', 'industries', 'proof', 'faq', 'audit']);

  const location = useLocation() as any;

  // Ensure absolute hash links like "/#system" reliably scroll after React renders.
  // (Browsers often try to scroll before SPA content mounts, leaving users at the top.)
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const id = hash.replace('#', '');

      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        tries += 1;
        if (tries < 20) window.setTimeout(tryScroll, 50);
      };

      // Defer to ensure layout is ready.
      window.setTimeout(tryScroll, 0);
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

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

  // Support cross-page navigation scroll:
  // navigate('/', { state: { scrollTo: 'audit' } }) from Header/other pages.
  useEffect(() => {
    const target = location?.state?.scrollTo as string | undefined;
    if (!target) return;

    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      tries += 1;
      if (tries < 20) window.setTimeout(tryScroll, 50);
    };

    window.setTimeout(tryScroll, 0);
  }, [location]);

  const systemSteps = [
    { number: 1, title: 'Demand Capture', description: 'Clinic ads + landing pages + offer framing' },
    { number: 2, title: 'Signal & Measurement', description: 'Server-side tracking, conversion validation' },
    { number: 3, title: 'Lead Qualification', description: 'Intent filters + patient routing rules' },
    { number: 4, title: 'Automation Layer', description: 'Instant follow-up, reminders, booking triggers' },
    { number: 5, title: 'Patient Booking', description: 'Calendar integration + CRM handoff' },
  ];

  const faqItems = [
    {
      question: 'What do you deliver in the audit?',
      answer: 'The audit analyzes your current patient acquisition setup including ads, landing pages, follow-up process, and tracking. You receive a report identifying where leads are leaking and specific recommendations to improve conversion.',
    },
    {
      question: 'Do you run ads or only build systems?',
      answer: 'Leads.bd builds customer acquisition infrastructure, not ad campaigns. We install tracking, landing pages, automation, and patient booking systems. We do not sell ad packages or manage media buying.',
    },
    {
      question: 'Do I need a new website?',
      answer: 'Not always. We typically add focused landing pages for campaigns while keeping your existing site unchanged. Our clinic marketing consultants recommend the minimum viable changes to improve patient booking conversion.',
    },
    {
      question: 'What tools do you integrate with?',
      answer: 'We integrate with GA4, GTM, Meta CAPI, CRMs like HubSpot and Zoho, WhatsApp Business API, and calendar booking tools. The system adapts to your existing marketing stack.',
    },
    {
      question: 'How fast can this be installed?',
      answer: 'A starter patient booking system can be deployed in 2-3 weeks. More complex systems with custom CRM integrations take 4-6 weeks. Timeline is confirmed during the initial audit.',
    },
    {
      question: 'What if we already run ads?',
      answer: 'Existing ad traffic is ideal. We optimize the post-click experience: better landing pages, faster follow-up automation, and proper conversion tracking. Same ad spend, more booked appointments.',
    },
    {
      question: 'What does Leads.bd NOT do?',
      answer: 'Leads.bd does not sell ad packages, templates, or run media buying campaigns. We install customer acquisition infrastructure—tracking, automation, landing pages, and patient booking systems—tailored to your business.',
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

  return (
    <PageTransition>
      <Helmet>
        <title>Customer Acquisition Systems for Clinics & Services | Leads.bd</title>
        <meta
          name="description"
          content="Customer acquisition infrastructure for clinics and service businesses. Tracking, automation, and patient booking systems that convert ad spend."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://leads.bd/" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Header scrollToSection={scrollToSection} />

      <main className="min-h-screen bg-infrastructure">
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-50" />
          <div className="absolute inset-0 signal-lines" />

          <div className="container-width relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Copy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6">
                  Turn Ad Spend Into Booked Customers — <span className="text-gradient-green">Automatically.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
                  Leads.bd is a customer acquisition consultancy that helps clinics and high-value service businesses convert ad spend into booked customers using tracking, automation, and patient booking systems.
                </p>
                <p className="text-sm text-primary/80 mb-8 font-medium">
                  Built for businesses where one customer is worth serious money.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => scrollToSection('audit')}
                    className="btn-hero"
                  >
                    Get a Free Acquisition Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => scrollToSection('system')}
                    variant="outline"
                    className="btn-secondary"
                  >
                    See How the System Works
                  </Button>
                </div>
              </motion.div>

              {/* Right Column - Infrastructure Snapshot */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <GlassCard variant="strong" className="p-6 md:p-8">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
                    Infrastructure Snapshot
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">Signal Accuracy</h4>
                        <p className="text-xs text-muted-foreground">Server-side tracking + event validation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">Instant Follow-Up</h4>
                        <p className="text-xs text-muted-foreground">Automation sequences + reminders</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">Booking Pipeline</h4>
                        <p className="text-xs text-muted-foreground">Qualification + routing + calendar handoff</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* System Section */}
        <section ref={sectionRefs.system} id="system" className="pt-24 pb-24 bg-white/[0.01]">
          <div className="container-width">
            <SectionHeading
              title="A Customer Acquisition System — Not Ads."
              subtitle="We install the infrastructure that turns clicks into booked customers."
            />

            <div className="mt-12">
              <SystemDiagram steps={systemSteps} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              {[
                { title: 'Signal Quality', description: 'Correct events, correct attribution, clean data.' },
                { title: 'Conversion Flow', description: 'Landing page → follow-up → booked appointment.' },
                { title: 'Automation', description: 'Instant response, reminders, and routing.' },
              ].map((item) => (
                <GlassCard key={item.title} variant="hover" className="p-6 md:p-8">
                  <h4 className="text-lg font-semibold text-foreground mb-3">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </GlassCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Industries */}
        <section ref={sectionRefs.industries} id="industries" className="pt-20 pb-20">
          <div className="container-width">
            <SectionHeading
              title="Built for Businesses Where One Customer Matters"
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <Link to="/clinics-growth">
                  <GlassCard variant="hover" className="p-6 md:p-8 h-full group cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-foreground">Clinics</h4>
                      <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-muted-foreground">Dental, Cosmetic, IVF, Diagnostics</p>
                  </GlassCard>
                </Link>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <GlassCard
                  variant="hover"
                  className="p-6 md:p-8 h-full cursor-pointer"
                  onClick={() => scrollToSection('audit')}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-4">Professional Services</h4>
                  <p className="text-muted-foreground">Immigration and more</p>
                </GlassCard>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <GlassCard
                  variant="hover"
                  className="p-6 md:p-8 h-full cursor-pointer"
                  onClick={() => scrollToSection('audit')}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-4">High-ticket Local Services</h4>
                  <p className="text-muted-foreground">Where booking matters</p>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Proof */}
        <section ref={sectionRefs.proof} id="proof" className="pt-20 pb-20 bg-white/[0.01]">
          <div className="container-width">
            <SectionHeading
              title="How the System Is Installed in Real Businesses"
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
                <GlassCard variant="strong" className="p-6 md:p-8 h-full">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Install Example: Dental Clinic</h4>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Challenge</span>
                      <p className="text-sm text-muted-foreground mt-1">High inquiries, low booking consistency</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Installed</span>
                      <p className="text-sm text-muted-foreground mt-1">Landing + routing + follow-up + booking</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Outcome</span>
                      <p className="text-sm text-muted-foreground mt-1">Cleaner bookings, faster response, less staff overload</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                }}
              >
                <GlassCard variant="strong" className="p-6 md:p-8 h-full">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Install Example: Cosmetic Clinic</h4>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Challenge</span>
                      <p className="text-sm text-muted-foreground mt-1">Low-intent inquiries wasting time</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Installed</span>
                      <p className="text-sm text-muted-foreground mt-1">Qualification + reminders + handoff</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Outcome</span>
                      <p className="text-sm text-muted-foreground mt-1">Better inquiry quality, clearer pipeline</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Audit */}
        <section ref={sectionRefs.audit} id="audit" className="pt-24 pb-24">
          <div className="container-width">
            <div className="max-w-2xl mx-auto">
              <SectionHeading
                title="See Where Customers Are Leaking."
                subtitle="We'll audit your acquisition path and show exactly what to install next."
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10"
              >
                <AuditForm sourcePage="homepage" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={sectionRefs.faq} id="faq" className="pt-16 pb-16 bg-white/[0.01]">
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

export default HomePage;
