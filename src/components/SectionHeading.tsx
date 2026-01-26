import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  isH1?: boolean;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  title,
  subtitle,
  centered = true,
  isH1 = false,
  className = '',
}) => {
  const HeadingTag = isH1 ? 'h1' : 'h2';
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {tag && (
        <motion.span 
          variants={itemVariants}
          className="inline-block text-xs font-semibold tracking-wider uppercase text-primary mb-3"
        >
          {tag}
        </motion.span>
      )}
      <motion.div variants={itemVariants}>
        <HeadingTag className={`${isH1 ? 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl' : 'text-2xl md:text-3xl lg:text-4xl'} font-bold text-foreground leading-tight`}>
          {title}
        </HeadingTag>
      </motion.div>
      {subtitle && (
        <motion.p 
          variants={itemVariants}
          className={`mt-3 text-sm md:text-base text-muted-foreground leading-snug ${centered ? 'max-w-xl mx-auto' : 'max-w-xl'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
