import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, HelpCircle, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import SectionHeading from '@/components/SectionHeading';
import WhatsAppButton from '@/components/WhatsAppButton';

const DisclaimerPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGlobalNavigation = (sectionId: string) => {
    navigate('/', { state: { scrollTo: sectionId } });
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Disclaimer | Platform Affiliations & Results | Leads.bd</title>
        <meta name="description" content="Important disclaimers regarding platform affiliations (Meta/Google) and service results." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://leads.bd/disclaimer" />
      </Helmet>

      <Header scrollToSection={handleGlobalNavigation} />

      <main className="min-h-screen bg-infrastructure pt-32 pb-20">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <SectionHeading 
              tag="Transparency"
              title="Platform & Results Disclaimer"
              subtitle="Clear expectations for our partnership."
            />

            {/* TL;DR Summary Card */}
            <div className="mt-8 mb-12">
              <GlassCard variant="strong" className="p-6 md:p-8 border-destructive/20 bg-destructive/5">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                  <h3 className="text-lg font-bold text-foreground">Critical Disclaimers (TL;DR)</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <span className="text-destructive font-bold">✕</span>
                      We are NOT Meta (Facebook) or Google.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive font-bold">✕</span>
                      We do NOT guarantee specific earnings/ROI.
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <span className="text-destructive font-bold">✕</span>
                      We do NOT provide medical advice (for Clinics).
                    </li>
                  </ul>
                </div>
              </GlassCard>
            </div>

            <GlassCard className="p-8 md:p-12">
              <div className="prose prose-invert max-w-none text-muted-foreground">
                <p className="text-sm opacity-60 mb-8">
                  Last updated: January 28, 2026
                </p>

                <h3 className="text-foreground font-semibold text-xl mb-4">1. Platform Affiliation</h3>
                <p className="mb-8">
                  Leads.bd is an independent infrastructure consultancy. This website and our services are <strong>not affiliated with, endorsed by, administered by, or associated with Meta Platforms, Inc. (Facebook/Instagram), Google LLC, Microsoft Corporation, or TikTok.</strong> All trademarks remain the property of their respective owners. We use these platforms as tools to deliver our services.
                </p>

                <h3 className="text-foreground font-semibold text-xl mb-4">2. Earnings & Results Disclaimer</h3>
                <p>
                  Any case studies, revenue figures, or booking numbers shown on this site are real examples from our clients or our own tests. However:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-8">
                  <li>They are used for illustrative purposes only.</li>
                  <li>They represent specific results under specific market conditions.</li>
                  <li><strong>Your results will vary</strong> based on your location, budget, industry, offer, and execution capability. We do not guarantee that you will achieve the same results.</li>
                </ul>

                <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  3. For Healthcare & Clinic Clients
                </h3>
                <div className="bg-white/5 p-5 rounded-lg border border-white/10 mb-8">
                  <p className="mb-2">
                    Our services for clinics (Dental, IVF, Cosmetic) are strictly limited to <strong>Marketing & Operational Infrastructure</strong>.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>We do not provide medical advice, diagnosis, or treatment plans.</li>
                    <li>Any content we create for your ads or landing pages must be reviewed by your medical professionals for accuracy.</li>
                    <li>You are responsible for ensuring your marketing complies with local medical advertising regulations.</li>
                  </ul>
                </div>

                <h3 className="text-foreground font-semibold text-xl mb-4">4. Third-Party Risk</h3>
                <p className="mb-8">
                  We are not responsible for the actions of third-party platforms. If an ad account is banned or a software API changes, we will work to fix the infrastructure, but we are not liable for business losses caused by external platform policies.
                </p>

                <h3 className="text-foreground font-semibold text-xl mb-4">5. Professional Advice</h3>
                <p className="mb-8">
                  The information provided on this website is for general informational purposes only and should not be considered as professional legal, financial, or medical advice.
                </p>
              </div>
            </GlassCard>

            <div className="mt-12 text-center">
              <Link 
                to="/" 
                onClick={() => window.scrollTo(0, 0)}
                className="text-primary hover:underline text-sm font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </PageTransition>
  );
};

export default DisclaimerPage;