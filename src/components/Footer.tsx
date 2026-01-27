import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { useScrollSpy } from '@/contexts/ScrollSpyContext';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/leadsbdhq',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/leads_bd',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/leads.bd',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/leadsbd-hq',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export const Footer: React.FC = () => {
  const location = useLocation();
  const { activeSection } = useScrollSpy();

  return (
    <footer className="border-t border-white/10 bg-infrastructure-dark/50 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-width px-5 sm:px-6 py-10 md:py-16 pb-24 sm:pb-12 md:pb-16">
        
        {/* Pre-Footer Closure CTA */}
        <div className="mb-12 border-b border-white/5 pb-8">
          <Link to="/#system" className="group inline-flex items-center text-white/80 hover:text-primary transition-colors">
            <span className="text-sm font-medium">Not ready for an audit? See how the architecture works</span>
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand Block */}
          <div className="flex flex-col items-center sm:items-start">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="inline-block mb-4">
              <Logo variant="dark" />
            </Link>

            {/* System Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono font-medium text-white/70 tracking-wide uppercase">All Systems Operational</span>
            </div>

            <p className="text-sm text-white/60 leading-relaxed max-w-[320px] text-center sm:text-left">
              Engineered growth infrastructure for high-value service businesses.
            </p>

            <nav aria-label="Social media links" className="mt-6">
              <ul className="flex items-center justify-center sm:justify-start gap-3">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Block */}
          <address className="not-italic flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold tracking-tight text-white mb-4 sm:mb-5 flex items-center gap-2">
              Contact Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@leads.bd"
                  className="group flex items-center justify-center sm:justify-start gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-white/40 group-hover:text-primary transition-colors" />
                  <span>contact@leads.bd</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801733000786"
                  className="group flex items-center justify-center sm:justify-start gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-white/40 group-hover:text-primary transition-colors" />
                  <span>+880 1733 000 786</span>
                </a>
              </li>
              {/* Response Time Trust Signal */}
              <li className="pt-2">
                <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-md inline-flex">
                  <Clock className="w-3 h-3" />
                  <span>Avg. Response: &lt;24h</span>
                </div>
              </li>
            </ul>
          </address>

          {/* Platform & Legal - Optimized Mobile Layout */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 grid grid-cols-2 gap-8 sm:gap-12">
            
            {/* Platform Block */}
            <nav aria-label="Platform pages" className="flex flex-col items-center sm:items-start">
              <h4 className="text-sm font-semibold tracking-tight text-white mb-4 sm:mb-5">
                Platform
              </h4>
              <ul className="space-y-2 text-center sm:text-left">
                <li>
                  <Link
                    to="/"
                    onClick={() => window.scrollTo(0, 0)}
                    className="block text-sm text-white/60 hover:text-white transition-colors"
                  >
                    System Logic
                  </Link>
                </li>
                <li>
                  <Link
                    to="/clinics-growth"
                    onClick={() => window.scrollTo(0, 0)}
                    className={`block text-sm transition-colors ${
                      location.pathname === '/clinics-growth' ? 'text-primary font-medium' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    For Clinics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#proof"
                    className="block text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Case Studies
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Legal Block */}
            <nav aria-label="Legal pages" className="flex flex-col items-center sm:items-start">
              <h4 className="text-sm font-semibold tracking-tight text-white mb-4 sm:mb-5">
                Legal
              </h4>
              <ul className="space-y-2 text-center sm:text-left">
                <li>
                  <Link
                    to="/privacy"
                    onClick={() => window.scrollTo(0, 0)}
                    className="block text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    onClick={() => window.scrollTo(0, 0)}
                    className="block text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/disclaimer"
                    onClick={() => window.scrollTo(0, 0)}
                    className="block text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Divider + Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
             <p className="text-xs text-white/50 leading-relaxed max-w-2xl">
              This website is not affiliated with, endorsed by, or sponsored by Meta (Facebook), Google, or Microsoft.
              Results vary by market conditions.
            </p>
            <p className="text-xs text-white/50 mt-2">
              © {new Date().getFullYear()} Leads.bd. An Engineering Brand by{' '}
              <a
                href="https://nodeway.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors border-b border-white/20 hover:border-white"
              >
                NodeWay
              </a>.
            </p>
          </div>
          
          <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
             <ShieldCheck className="w-4 h-4 text-emerald-500" />
             <span className="text-[10px] font-mono text-white/60">SECURE INFRASTRUCTURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;