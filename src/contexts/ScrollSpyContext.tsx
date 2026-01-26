import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollSpyContextType {
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
}

const ScrollSpyContext = createContext<ScrollSpyContextType>({
  activeSection: null,
  setActiveSection: () => {},
});

export const useScrollSpy = () => useContext(ScrollSpyContext);

interface ScrollSpyProviderProps {
  children: React.ReactNode;
}

export const ScrollSpyProvider: React.FC<ScrollSpyProviderProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation();

  // Reset active section when navigating away from homepage
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(null);
    }
  }, [location.pathname]);

  return (
    <ScrollSpyContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ScrollSpyContext.Provider>
  );
};

// Hook to set up Intersection Observer for sections
export const useScrollSpyObserver = (sectionIds: string[]) => {
  const { setActiveSection } = useScrollSpy();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds, setActiveSection, location.pathname]);
};
