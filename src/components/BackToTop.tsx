import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Logic: Check if we are on a legal page where WhatsApp is hidden
  const legalPaths = ['/privacy', '/terms', '/disclaimer'];
  const isWhatsAppHidden = legalPaths.includes(location.pathname);

  // Dynamic Position:
  // If WhatsApp is hidden (Legal Pages) -> Sit at bottom-6
  // If WhatsApp is visible (Other Pages) -> Sit higher at bottom-24 to avoid overlap
  const positionClass = isWhatsAppHidden ? 'bottom-6' : 'bottom-24';

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          // Using template literal to inject dynamic position class
          className={`fixed ${positionClass} right-6 z-40 p-3 rounded-full bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary hover:scale-110 transition-all duration-200 backdrop-blur-sm`}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;