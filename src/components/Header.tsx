import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { Button } from './ui/button';
import { useScrollSpy } from '@/contexts/ScrollSpyContext';

interface HeaderProps {
  scrollToSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { activeSection } = useScrollSpy();

  // Scroll Detection Logic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isNavItemActive = (item: any) => {
    // If it's the Solutions page
    if (item.label === 'Solutions' && location.pathname === '/clinics-growth') return true;
    // If it's a scroll section on Homepage
    if (location.pathname === '/' && activeSection === item.target) return true;
    return false;
  };

  // UPDATED: Solutions is now a direct page route, others are scroll targets
  const navItems = [
    { label: 'System', target: 'system', type: 'scroll' },
    { label: 'Solutions', target: '/clinics-growth', type: 'route' }, // Direct Page Link
    { label: 'Proof', target: 'proof', type: 'scroll' },
    { label: 'FAQs', target: 'faq', type: 'scroll' },
  ];

  const handleNavClick = (item: any) => {
    if (item.type === 'scroll' && scrollToSection) {
      scrollToSection(item.target);
    }
    // For 'route' type, the Link component handles navigation
    setIsMenuOpen(false);
  };

  const handleAuditClick = () => {
    if (scrollToSection) scrollToSection('audit');
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'header-scrolled' : 'header-transparent py-2'
        }`}
      >
        <div className="container-width">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex-shrink-0 relative z-50"
              onClick={() => window.scrollTo(0, 0)}
            >
              <Logo variant="dark" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                if (item.type === 'route') {
                  // External Page Link (Solutions)
                  return (
                    <Link
                      key={item.label}
                      to={item.target}
                      className={`nav-link text-sm font-medium transition-colors ${
                        isNavItemActive(item)
                          ? 'text-primary active'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                } else {
                  // Scroll Link (System, Proof, FAQ)
                  return location.pathname === '/' ? (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item)}
                      className={`nav-link text-sm font-medium transition-colors ${
                        isNavItemActive(item)
                          ? 'text-primary active'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      to={`/#${item.target}`}
                      className={`nav-link text-sm font-medium transition-colors ${
                        isNavItemActive(item)
                          ? 'text-primary active'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }
              })}
            </nav>

            {/* CTA Button (Desktop) with Shimmer */}
            <div className="hidden md:block">
              <Button 
                onClick={handleAuditClick}
                className="btn-primary btn-shimmer"
              >
                Get a Free Audit
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Modern Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden flex flex-col pt-32 px-6"
          >
            <nav className="flex flex-col gap-6 items-center">
              {navItems.map((item) => {
                if (item.type === 'route') {
                  // Mobile External Link
                  return (
                    <Link
                      key={item.label}
                      to={item.target}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-2xl font-medium transition-colors ${
                        isNavItemActive(item)
                          ? 'text-primary'
                          : 'text-white/80'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                } else {
                  // Mobile Scroll Link
                  return location.pathname === '/' ? (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item)}
                      className={`text-2xl font-medium transition-colors ${
                        isNavItemActive(item)
                          ? 'text-primary'
                          : 'text-white/80'
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      to={`/#${item.target}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-2xl font-medium transition-colors ${
                        isNavItemActive(item)
                          ? 'text-primary'
                          : 'text-white/80'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }
              })}
              
              <div className="w-full h-px bg-white/10 my-4" />
              
              <Button
                onClick={handleAuditClick}
                className="btn-hero w-full max-w-xs text-lg py-6 btn-shimmer"
              >
                Book Your Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;