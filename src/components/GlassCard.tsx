import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'strong' | 'hover';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  variant = 'default', 
  className = '',
  as: Component = 'div',
  onClick
}) => {
  const baseClasses = 'rounded-2xl border backdrop-blur-xl transition-all duration-300';
  
  const variantClasses = {
    default: 'border-white/10 bg-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.3)]',
    strong: 'border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.4)]',
    // Updated for richer hover effect (Glow + Lift)
    hover: 'border-white/10 bg-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.3)] hover:border-primary/30 hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,200,150,0.15)] cursor-pointer',
  };

  return (
    <Component className={cn(baseClasses, variantClasses[variant], className)} onClick={onClick}>
      {children}
    </Component>
  );
};

export default GlassCard;