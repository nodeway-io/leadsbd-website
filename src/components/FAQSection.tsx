import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ items, className = '' }) => {
  return (
    <Accordion type="single" collapsible className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="glass-card-hover px-6 border-white/10 rounded-xl overflow-hidden"
        >
          <AccordionTrigger className="text-left text-sm md:text-base font-medium text-foreground py-5 hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground pb-5 leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQSection;
