import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';

const TermsPage: React.FC = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Terms of Service | Leads.bd</title>
        <meta name="description" content="Terms of service for Leads.bd - Read our terms and conditions." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://leads.bd/terms" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-infrastructure pt-32 pb-20">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
            
            <GlassCard className="p-6 md:p-10">
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-6">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground">
                    By accessing or using the Leads.bd website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Services</h2>
                  <p className="text-muted-foreground">
                    Leads.bd provides customer acquisition infrastructure services, including but not limited to tracking setup, landing page development, automation systems, and booking integrations for service businesses.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
                  <p className="text-muted-foreground mb-4">
                    You agree to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Provide accurate and complete information</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Not interfere with the proper functioning of our website</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
                  <p className="text-muted-foreground">
                    All content on this website, including text, graphics, logos, and software, is the property of Leads.bd or its licensors and is protected by intellectual property laws.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">5. Limitation of Liability</h2>
                  <p className="text-muted-foreground">
                    Leads.bd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services. Results may vary based on market conditions, budget, and execution.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">6. Modifications</h2>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">7. Governing Law</h2>
                  <p className="text-muted-foreground">
                    These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
                  </p>
                </section>
              </div>
            </GlassCard>

            <div className="mt-8 text-center">
              <Link to="/" className="text-primary hover:underline text-sm">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </PageTransition>
  );
};

export default TermsPage;
