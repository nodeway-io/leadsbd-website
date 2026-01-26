import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

export interface DiagramStep {
  number: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface SystemDiagramProps {
  steps: DiagramStep[];
  className?: string;
}

export const SystemDiagram: React.FC<SystemDiagramProps> = ({ steps, className = '' }) => {
  return (
    <div className={`flex flex-col md:flex-row gap-6 md:gap-4 ${className}`}>
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`relative flex-1 ${index !== steps.length - 1 ? 'diagram-connector-vertical md:diagram-connector-horizontal' : ''}`}
        >
          {/* Mobile vertical connector line */}
          {index !== steps.length - 1 && (
            <div className="absolute left-6 top-16 bottom-0 w-px bg-white/10 md:hidden" />
          )}
          
          {/* Desktop horizontal connector line */}
          {index !== steps.length - 1 && (
            <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 w-4 h-px bg-white/10" />
          )}

          <GlassCard variant="hover" className="p-5 md:p-6 h-full">
            <div className="flex items-start gap-4">
              {/* Step Number */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">{step.number}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm md:text-base mb-1">
                  {step.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};

export default SystemDiagram;
