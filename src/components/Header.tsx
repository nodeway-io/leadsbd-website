import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { Button } from './ui/button';
import { useScrollSpy } from '@/contexts/ScrollSpyContext';

interface HeaderProps {
  scrollToSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { activeSection } = useScrollSpy();

  const isNavItemActive = (sectionId: string) => {
    // On clinics page, Industries is always active
    if (location.pathname === '/clinics-growth' && sectionId === 'industries') {
      return true;
    }
    // On homepage, use scroll spy
    if (location.pathname === '/') {
      return activeSection === sectionId;
    }
    return false;
  };

  const navItems = [
    { label: 'System', sectionId: 'system' },
    { label: 'Industries', sectionId: 'industries' },
    { label: 'Proof', sectionId: 'proof' },
    { label: 'FAQs', sectionId: 'faq' },
  ];

  const handleNavClick = (sectionId: string) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  const handleAuditClick = () => {
    if (scrollToSection) {
      scrollToSection('audit');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-glass">
      <div className="container-width">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex-shrink-0"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Logo variant="dark" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {location.pathname === '/' ? (
              navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.sectionId)}
                  className={`nav-link text-sm font-medium transition-colors ${
                    isNavItemActive(item.sectionId)
                      ? 'text-primary active'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))
            ) : (
              navItems.map((item) => (
                <Link
                  key={item.label}
                  to={`/#${item.sectionId}`}
                  className={`nav-link text-sm font-medium transition-colors ${
                    isNavItemActive(item.sectionId)
                      ? 'text-primary active'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={handleAuditClick}
              className="btn-primary"
            >
              Get a Free Audit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">
              {location.pathname === '/' ? (
                navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.sectionId)}
                    className={`text-left text-sm font-medium transition-colors py-2 ${
                      isNavItemActive(item.sectionId)
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </button>
                ))
              ) : (
                navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={`/#${item.sectionId}`}
                    className={`text-left text-sm font-medium transition-colors py-2 ${
                      isNavItemActive(item.sectionId)
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))
              )}
              <Button
                onClick={handleAuditClick}
                className="btn-primary w-full mt-2"
              >
                Get a Free Audit
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
