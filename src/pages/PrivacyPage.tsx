import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, Database } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import SectionHeading from '@/components/SectionHeading';
import WhatsAppButton from '@/components/WhatsAppButton';

const PrivacyPage: React.FC = () => {
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
        <title>Privacy Policy | Data Security & Compliance | Leads.bd</title>
        <meta name="description" content="Our commitment to data privacy, patient data security (for clinics), and infrastructure compliance." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://leads.bd/privacy" />
      </Helmet>

      <Header scrollToSection={handleGlobalNavigation} />

      <main className="min-h-screen bg-infrastructure pt-32 pb-20">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <SectionHeading 
              tag="Data Stewardship"
              title="Privacy Policy & Data Security"
              subtitle="How we protect your business intelligence and patient data."
            />
            
            {/* TL;DR Summary Card */}
            <div className="mt-8 mb-12">
              <GlassCard variant="strong" className="p-6 md:p-8 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">Privacy at a Glance (TL;DR)</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      We build infrastructure; we do not sell your data.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      For Clinics: Patient data remains 100% yours.
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      We use secure, encrypted connections (SSL/TLS).
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      You can request data deletion at any time.
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

                <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  1. Information We Collect
                </h3>
                <p>
                  We collect information necessary to build and maintain your customer acquisition infrastructure. This includes:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-8">
                  <li><strong>Business Logic Data:</strong> Information about your services, pricing, and operational flows needed to configure automation.</li>
                  <li><strong>Contact Information:</strong> Name, email, phone number, and billing details.</li>
                  <li><strong>Infrastructure Usage:</strong> Data on how you interact with the dashboards and tools we install.</li>
                </ul>

                <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  2. Healthcare & Sensitive Data (For Clinics)
                </h3>
                <p>
                  We recognize the sensitive nature of data handled by our medical and high-value service clients.
                </p>
                <div className="bg-white/5 p-5 rounded-lg border border-white/10 mb-8">
                  <p className="font-medium text-foreground mb-2">Our Promise to Healthcare Providers:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>We act as a <strong>Data Processor</strong>, not a Data Controller, for your patient records.</li>
                    <li>Patient data captured through our system (names, appointments) is stored in secure, isolated environments (e.g., your own CRM or secure cloud).</li>
                    <li>We never aggregate, sell, or share your patient lists with third parties or other clients.</li>
                  </ul>
                </div>

                <h3 className="text-foreground font-semibold text-xl mb-4">3. How We Use Your Information</h3>
                <p>We use your data solely to:</p>
                <ul className="list-disc pl-5 space-y-2 mb-8">
                  <li>Deploy and optimize your acquisition system (e.g., tracking setup, landing pages).</li>
                  <li>Communicate regarding system updates, audits, or support.</li>
                  <li>Comply with legal obligations and prevent fraud.</li>
                </ul>

                <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  4. Third-Party Tools & Integration
                </h3>
                <p className="mb-8">
                  Our infrastructure integrates with third-party tools (Meta, Google, HubSpot, WhatsApp API). While we ensure secure handoffs, data processed by these platforms is subject to their respective privacy policies. We advise reviewing the policies of any tool we integrate into your stack.
                </p>

                <h3 className="text-foreground font-semibold text-xl mb-4">5. Data Security</h3>
                <p className="mb-8">
                  We implement industry-standard security measures, including encryption, access controls, and regular audits, to protect your data from unauthorized access or disclosure.
                </p>

                <h3 className="text-foreground font-semibold text-xl mb-4">6. Your Rights</h3>
                <p className="mb-8">
                  You have the right to access, correct, or delete your personal business information stored with us. To exercise these rights, please contact our support team.
                </p>

                <div className="border-t border-white/10 pt-8 mt-8">
                  <h4 className="text-foreground font-bold mb-2">Contact Us regarding Privacy</h4>
                  <p>
                    If you have questions about our data practices or compliance:<br/>
                    Email: <span className="text-primary">contact@leads.bd</span>
                  </p>
                </div>
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

export default PrivacyPage;