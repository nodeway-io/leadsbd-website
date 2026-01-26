import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';

const DisclaimerPage: React.FC = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Disclaimer | Leads.bd</title>
        <meta name="description" content="Disclaimer for Leads.bd - Important legal information about our services." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://leads.bd/disclaimer" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-infrastructure pt-32 pb-20">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Disclaimer</h1>
            
            <GlassCard className="p-6 md:p-10">
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-6">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Platform Affiliations</h2>
                  <p className="text-muted-foreground">
                    This website is not affiliated with, endorsed by, or sponsored by Meta (Facebook), Google, or Microsoft. Any references to these platforms are for informational purposes only to describe our integration capabilities.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Results Disclaimer</h2>
                  <p className="text-muted-foreground">
                    Results may vary based on multiple factors including but not limited to market conditions, budget, execution, industry, and individual business circumstances. Past performance of our systems or examples shared do not guarantee future results.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Informational Purpose</h2>
                  <p className="text-muted-foreground">
                    The information provided on this website is for general informational purposes only. It is not intended to be professional advice and should not be relied upon as such. Please consult with appropriate professionals for advice specific to your situation.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Third-Party Tools</h2>
                  <p className="text-muted-foreground">
                    We work with various third-party tools and platforms (such as Google Analytics, Meta CAPI, CRM systems, etc.) to deliver our services. We are not responsible for the performance, policies, or practices of these third-party services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">No Guarantees</h2>
                  <p className="text-muted-foreground">
                    While we strive to provide effective customer acquisition infrastructure, we make no guarantees regarding specific results, conversion rates, booking numbers, or revenue outcomes. Success depends on many factors beyond the systems we install.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">Contact</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about this disclaimer, please contact us through our website.
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

export default DisclaimerPage;
