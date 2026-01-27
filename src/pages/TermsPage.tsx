import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, AlertTriangle, Briefcase } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import SectionHeading from '@/components/SectionHeading';
import WhatsAppButton from '@/components/WhatsAppButton';

const TermsPage: React.FC = () => {
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
        <title>Terms of Service | Infrastructure Agreements | Leads.bd</title>
        <meta name="description" content="Terms regarding our customer acquisition infrastructure, licensing, and client responsibilities." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://leads.bd/terms" />
      </Helmet>

      <Header scrollToSection={handleGlobalNavigation} />

      <main className="min-h-screen bg-infrastructure pt-32 pb-20">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <SectionHeading 
              tag="Service Agreement"
              title="Terms of Service"
              subtitle="Defining the relationship between System Builder (Us) and System Owner (You)."
            />

             {/* TL;DR Summary Card */}
             <div className="mt-8 mb-12">
              <GlassCard variant="strong" className="p-6 md:p-8 border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-foreground" />
                  <h3 className="text-lg font-bold text-foreground">Terms at a Glance (TL;DR)</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">✓</span>
                      We install infrastructure (tracking, automation, pages).
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">✓</span>
                      You own the data and the leads generated.
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">!</span>
                      Results depend on market execution (ad spend, offer).
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">!</span>
                      We are not responsible for third-party (Meta/Google) bans.
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

                <h3 className="text-foreground font-semibold text-xl mb-4">1. Scope of Services</h3>
                <p className="mb-8">
                  Leads.bd provides "Customer Acquisition Infrastructure" services. This includes the design, development, and integration of tracking systems, landing pages, automation workflows, and CRM pipelines. We act as architects and engineers for your growth systems.
                </p>

                <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  2. Client Responsibilities
                </h3>
                <p>To ensure the system functions correctly, you agree to:</p>
                <ul className="list-disc pl-5 space-y-2 mb-8">
                  <li>Provide timely access to necessary accounts (Ad Managers, Domain DNS, CRM).</li>
                  <li>Ensure your business offer and services comply with local laws.</li>
                  <li>Manage the daily operation of the system (e.g., calling leads, managing ad budget), unless a management retainer is agreed upon.</li>
                </ul>

                <h3 className="text-foreground font-semibold text-xl mb-4">3. Intellectual Property & Ownership</h3>
                <div className="bg-white/5 p-5 rounded-lg border border-white/10 mb-8">
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li><strong>You Own:</strong> The leads, patient data, domain names, and ad accounts connected to the system.</li>
                    <li><strong>We Retain:</strong> Intellectual property rights to our proprietary code snippets, automation templates, and "System Logic" frameworks, granting you a perpetual license to use them for your business.</li>
                  </ul>
                </div>

                <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  4. Performance & Results Disclaimer
                </h3>
                <p className="mb-8">
                  While we build high-performance infrastructure based on proven data, <strong>we cannot guarantee specific revenue, booking numbers, or ad costs.</strong> Marketing results are influenced by external factors such as competition, platform algorithms (Meta/Google), market demand, and your team's sales follow-up. We guarantee the <em>functionality</em> of the system, not the <em>market response</em>.
                </p>

                <h3 className="text-foreground font-semibold text-xl mb-4">5. Third-Party Platforms</h3>
                <p className="mb-8">
                  Our systems rely on third-party platforms (e.g., Facebook Ads, Google Analytics, WhatsApp). We are not liable for service interruptions, policy changes, or account suspensions imposed by these external providers.
                </p>

                <h3 className="text-foreground font-semibold text-xl mb-4">6. Payment & Refunds</h3>
                <p className="mb-8">
                  Services are billed as per the agreed proposal (Project Basis or Retainer). Due to the labor-intensive nature of infrastructure setup, setup fees are generally non-refundable once work has commenced.
                </p>

                <h3 className="text-foreground font-semibold text-xl mb-4">7. Governing Law</h3>
                <p className="mb-8">
                  These terms shall be governed by the laws of Bangladesh, applicable to our global remote operations.
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

export default TermsPage;