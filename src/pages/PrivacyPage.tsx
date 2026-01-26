import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';

const PrivacyPage: React.FC = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Privacy Policy | Leads.bd</title>
        <meta name="description" content="Privacy policy for Leads.bd - Learn how we collect, use, and protect your information." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://leads.bd/privacy" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-infrastructure pt-32 pb-20">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
            
            <GlassCard className="p-6 md:p-10">
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-6">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">
                    We collect information you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Name and contact information (email, phone, WhatsApp)</li>
                    <li>Business or clinic name</li>
                    <li>City/location</li>
                    <li>Information about your current advertising activities</li>
                    <li>Service type or industry</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Respond to your inquiries and provide requested services</li>
                    <li>Conduct audits and assessments of your acquisition infrastructure</li>
                    <li>Communicate with you about our services</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">3. Information Sharing</h2>
                  <p className="text-muted-foreground">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services or as required by law.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">4. Analytics</h2>
                  <p className="text-muted-foreground">
                    We use analytics tools (such as Google Analytics) to understand how visitors use our website. This helps us improve our services and user experience. These tools may collect information about your device, browser, and browsing behavior.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">5. Data Security</h2>
                  <p className="text-muted-foreground">
                    We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">6. Your Rights</h2>
                  <p className="text-muted-foreground">
                    You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us using the information below.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">7. Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy, please contact us through our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">8. Changes to This Policy</h2>
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
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

export default PrivacyPage;
