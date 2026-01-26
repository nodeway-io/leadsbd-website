import React from 'react';
import { motion } from 'framer-motion';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '8801733000786';
const DEFAULT_MESSAGE = "Hi I'm contacting from the Leads.bd website. Please assist me with customer acquisition and growth.";

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = WHATSAPP_NUMBER,
  message = DEFAULT_MESSAGE,
}) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [0, -5, 0, 5, 0],
      }}
      transition={{ 
        scale: { delay: 1, type: 'spring', stiffness: 200 },
        opacity: { delay: 1, duration: 0.3 },
        y: { 
          delay: 1.5,
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={{ 
        scale: 1.08,
        boxShadow: '0 20px 40px -8px rgba(0, 200, 150, 0.35), 0 8px 16px -4px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 cursor-pointer"
      style={{
        // Apple-style squircle using CSS clip-path superellipse approximation
        borderRadius: '22%',
        // Premium gradient from brand green to deep emerald
        background: 'linear-gradient(135deg, #00C896 0%, #00A67D 50%, #008F6B 100%)',
        // Glassmorphism effect
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        // Deep soft shadow for floating effect
        boxShadow: '0 12px 32px -6px rgba(0, 200, 150, 0.25), 0 6px 12px -3px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        // Subtle border for glass edge
        border: '1px solid rgba(255, 255, 255, 0.12)',
      }}
      aria-label="Chat on WhatsApp"
    >
      {/* Inner glass highlight overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: '22%',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
        }}
      />
      
      {/* WhatsApp SVG Icon - crisp white centered */}
      <svg 
        viewBox="0 0 24 24" 
        className="h-6 w-6 relative z-10"
        fill="white"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  );
};

export default WhatsAppButton;
