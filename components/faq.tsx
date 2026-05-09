'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is NeuroLink a replacement for therapy?',
      answer: 'NeuroLink is designed to complement, not replace, professional therapy. It provides immediate support and evidence-based techniques, but if you need ongoing clinical care, we encourage you to connect with a mental health professional.',
    },
    {
      question: 'Is my data actually private?',
      answer: 'Yes. All conversations are encrypted end-to-end, and we never sell or share your data. We comply with HIPAA and GDPR standards.',
    },
    {
      question: 'Can I talk to a human counselor?',
      answer: 'NeuroLink connects you with campus counseling services and can refer you to licensed therapists when needed. Premium plans include access to crisis support specialists.',
    },
    {
      question: 'What if I&apos;m having a mental health crisis?',
      answer: 'NeuroLink has dedicated crisis support available 24/7. You can access immediate resources, and we can connect you with emergency services if needed.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! All plans come with a 14-day free trial. You can try Student Plus features at no cost to see if it&apos;s right for you.',
    },
    {
      question: 'Can my university use NeuroLink?',
      answer: 'Absolutely. Our Campus Pro plan is designed for universities and includes admin dashboards, usage analytics, and integration support.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/60">
            Everything you need to know about NeuroLink
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="border border-border rounded-xl overflow-hidden bg-card/30 hover:bg-card/50 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-card/30 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-secondary" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    <p className="p-6 text-foreground/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
