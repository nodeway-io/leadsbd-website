import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-primary origin-left z-[60]"
      style={{ 
        scaleX,
        boxShadow: '0 0 10px hsl(161 100% 39% / 0.8), 0 0 20px hsl(161 100% 39% / 0.4)'
      }}
    />
  );
};

export default ScrollProgress;
