'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What documents do I need to rent a laptop?',
    answer:
      'You will need a valid government-issued ID (driver\'s license or passport) and a credit card for the security deposit. For business rentals, we may require additional documentation. All renters must complete our verification process.',
  },
  {
    question: 'How does the security deposit work?',
    answer:
      'We charge a refundable security deposit equal to 50% of the monthly rental price. This deposit is fully refunded within 3-5 business days after the laptop is returned in good condition.',
  },
  {
    question: 'Can I extend my rental period?',
    answer:
      'Yes, you can extend your rental at any time through your dashboard or by contacting our support team. Extensions are charged at the same daily rate, and you can extend for as long as you need.',
  },
  {
    question: 'What happens if the laptop gets damaged?',
    answer:
      'All our laptops come with basic insurance that covers normal wear and tear. For accidental damage, you may be liable for repair costs up to the deductible amount. We recommend reviewing our insurance options during checkout.',
  },
  {
    question: 'Do you offer same-day delivery?',
    answer:
      'Yes, same-day delivery is available in select cities for orders placed before 2 PM. Delivery fees vary based on location. You can also choose to pick up from one of our partner locations.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'You can cancel your rental up to 24 hours before the scheduled delivery for a full refund. Cancellations within 24 hours may incur a small processing fee.',
  },
  {
    question: 'Are the laptops sanitized between rentals?',
    answer:
      'Absolutely. Every laptop undergoes a thorough cleaning and sanitization process between rentals. We also reset all devices to factory settings to ensure your data privacy.',
  },
  {
    question: 'Can I rent multiple laptops at once?',
    answer:
      'Yes, we offer bulk rentals for businesses and events. Contact our sales team for special pricing on orders of 5 or more laptops.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Got questions? We have got answers. If you do not find what you are looking for, 
            feel free to contact our support team.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium hover:text-blue-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
